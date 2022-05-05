<template>
  <div class="forms">
    <div class="form space-between">
      <div class="form-texts">
        <div class="form-texts__title">
          Connent to ledger
        </div>
        <div class="form-texts__description">
          Connect your ledger for future use
        </div>
      </div>
      <div class="form-button">
        <button class="btn" @click="connectLedger">
          Connect
        </button>
      </div>
    </div>

    <div class="form">
      <div class="form-texts">
        <div class="form-texts__title">
          Select chain enviroment
        </div>
        <div class="form-buttons-row space-between">
          <button
            class="btn"
            :class="{ 'btn-active': activeDecimalUrlName === 'Devnet' }"
            @click="decimalConstructor(restUrlArray[0], 'Devnet')"
          >
            Devnet
          </button>
          <button
            class="btn"
            :class="{ 'btn-active': activeDecimalUrlName === 'Testnet' }"
            @click="decimalConstructor(restUrlArray[0], 'Testnet')"
          >
            Testnet
          </button>
          <button
            class="btn"
            :class="{ 'btn-active': activeDecimalUrlName === 'Mainnet' }"
            @click="decimalConstructor(restUrlArray[0], 'Mainnet')"
          >
            Mainnet
          </button>
        </div>
      </div>
    </div>

    <div class="form">
      <div class="form-buttons-inline">
        <button
          v-for="(txType, index) in Object.keys(txTypes)"
          :key="'type_' + index"
          class="btn-inline"
          :class="{ 'btn-active': activeTxType === txType }"
          @click="changeActiveTxType(txType)"
        >
          {{ txType }}
        </button>
      </div>

      <div class="form-editor">
        <textarea id="unsignedTx" v-model="unsignedTxStringify" name="unsignedTx" rows="4"></textarea>
        <div class="form-submit">
          <button class="btn btn-active">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Decimal } from "decimal-js-sdk";
// eslint-disable-next-line import/no-extraneous-dependencies
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import DecimalApp from "../../src";
import txTypes from "../assets/txTypes.json";

export default {
  name: "MainForm",
  components: {},
  data() {
    return {
      unsignedTx: {},
      txTypes,
      decimal: null,
      decimalNanoApp: null,
      activeDecimalUrlName: null,
      activeDecimalUrl: null,
      activeTxType: null,
      restUrlArray: [
        "https://devnet-gate.decimalchain.com/api/rpc/",
        "https://testnet-gate.decimalchain.com/api/rpc/",
        "https://mainnet-gate.decimalchain.com/api/rpc/",
      ],
      path: [44, 60, 0, 0, 0],
      wallet: {
        address: null,
        pubKey: null,
      },
      transport: null,
    };
  },
  computed: {
    unsignedTxStringify() {
      return JSON.stringify(this.unsignedTx, undefined, 2);
    },
  },
  methods: {
    changeActiveTxType(txType) {
      this.activeTxType = txType;
      this.unsignedTx = JSON.parse(JSON.stringify(txTypes[txType]));
    },
    decimalConstructor(restURL, chain) {
      this.activeDecimalUrlName = restURL;
      const decimalOptions = {
        restURL,
      };
      this.activeDecimalUrl = chain;
      this.decimal = new Decimal(decimalOptions);
    },
    async request(url) {
      try {
        const responce = await fetch(url);
        return responce.json();
      } catch {
        return {};
      }
    },
    async getChainInfo() {
      const accountInfo = await this.request(
        `${this.activeDecimalUrlName}accounts/${this.wallet.bech32_address}`,
      );
      const nodeInfo = await this.request(`${this.activeDecimalUrlName}node_info`);

      return {
        account_number: accountInfo?.result?.value?.account_number ?? "0",
        sequence: accountInfo?.result?.value?.sequence ?? "0",
        chain_id: nodeInfo?.node_info?.network || null,
      };
    },
    async connectLedger() {
      this.transport = await TransportWebUSB.create();
      this.decimalNanoApp = new DecimalApp(this.transport);
      this.wallet = await this.decimalNanoApp.getAddressAndPubKey(this.path, "dx");
      console.info({ wallet: this.wallet });
    },
  },
};
</script>

<style>
.forms {
  padding: 10px;
  float: left;
  width: 100%;
}

.form {
  margin: 30px;
  padding: 24px;
  border: 1px solid rgba(224, 224, 255, 0.06);
  border-radius: 12px;
  width: 100%;
  text-align: left;
}

.form-texts {
  color: rgba(224, 224, 255, 0.6);
  line-height: 18px;
  font-weight: 400;
  font-size: 12px;
}

.form-texts__title {
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #fff;
}

.form-submit {
  text-align: center;
  padding: 20px;
}

.form-editor > textarea {
  background-color: #2d2f33;
  color: hsla(0, 0%, 100%, 0.6);
  width: 100%;
  resize: none;
  height: 30vh;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid transparent;
}

.form-button {
  text-align: right;
}

.form-buttons-row > button {
  margin: 10px 20px;
}

.form-buttons-inline {
  display: flex;
  flex-wrap: wrap;
}

.btn {
  max-width: 240px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  padding: 0 12px;
  min-width: 148px;
  height: 48px;
  transition: 0.35s;
  border-radius: 12px;
  color: #0bf;
  border: 2px solid #0bf;
  background: rgba(0, 187, 255, 0.03);
}

.btn-inline {
  color: #0bf;
  border: 1px solid #0bf;
  background: rgba(0, 187, 255, 0.03);
  margin: 5px;
  padding: 5px;
  border-radius: 8px;
}

.btn-active {
  color: #fff;
  background: #0bf;
}
</style>

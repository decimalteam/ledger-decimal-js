<template>
  <div class="forms">
    <div class="form space-between">
      <div class="form-texts">
        <div class="form-texts__title">
          Connect to ledger
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
          Select chain environment
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
            @click="decimalConstructor(restUrlArray[1], 'Testnet')"
          >
            Testnet
          </button>
          <button
            class="btn"
            :class="{ 'btn-active': activeDecimalUrlName === 'Mainnet' }"
            @click="decimalConstructor(restUrlArray[2], 'Mainnet')"
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
          <button class="btn btn-active" @click="txTransfer">
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
import { bytesToBase64 } from "@tendermint/belt";
import { createSignMsg } from "@tendermint/sig";
// eslint-disable-next-line import/no-extraneous-dependencies
import secp256k1 from "secp256k1/elliptic";
import DecimalApp from "../../src";
import txTypes from "../assets/txTypes.json";

export default {
  name: "MainForm",
  components: {},
  data() {
    return {
      unsignedTx: {},
      unsignedTxStringify: "{}",
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
  methods: {
    changeActiveTxType(txType) {
      this.activeTxType = txType;
      this.unsignedTx = JSON.parse(JSON.stringify(txTypes[txType]));
      this.unsignedTxStringify = JSON.stringify(txTypes[txType], undefined, 2);
    },
    decimalConstructor(restURL, chain) {
      this.activeDecimalUrl = restURL;
      const decimalOptions = {
        restURL,
      };
      this.activeDecimalUrlName = chain;
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
        `${this.activeDecimalUrl}accounts/${this.wallet.bech32_address}`,
      );
      const nodeInfo = await this.request(`${this.activeDecimalUrl}node_info`);

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
    },
    async txTransfer() {
      const unsignTx = await this.decimal.prepareTx(this.activeTxType, JSON.parse(this.unsignedTxStringify));
      const publicKey = (await this.decimalNanoApp.publicKey(this.path)).compressed_pk;

      const signatures = {
        signature: "",
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: bytesToBase64(publicKey),
        },
      };

      const message = JSON.stringify(createSignMsg(unsignTx, await this.getChainInfo()));
      const signature = await this.decimalNanoApp.sign(this.path, message);

      const tx = JSON.parse(message);
      tx.msg = tx.msgs;
      tx.msgs = undefined;

      signatures.signature = bytesToBase64(secp256k1.signatureImport(signature.signature));
      tx.signatures = [signatures];

      const result = await this.decimal.postTx({ mode: "sync", tx }, { sendTxDirectly: true });
      console.log(result);
    },
  },
};
</script>

<style>
.forms {
  width: 100%;
  display: grid;
  grid-gap: 24px;
}

.form {
  border: 1px solid rgba(224, 224, 255, 0.06);
  border-radius: 12px;
  width: 100%;
  text-align: left;
  padding: 24px;
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
  width: 95%;
  resize: none;
  height: 30vh;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid transparent;
}

.form-button {
  text-align: right;
}

.form-buttons-row {
  flex-wrap: wrap;
}

.form-buttons-row > button {
}

.form-buttons-inline {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
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

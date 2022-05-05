<template>
  <div class="forms">
    <div class="form space-between">
      <div class="form-texts">
        <div class="form-texts__title">Connent to ledger</div>
        <div class="form-texts__description">
          Connect your ledger for future use
        </div>
      </div>
      <div class="form-button">
        <button class="btn">Connect</button>
      </div>
    </div>

    <div class="form">
      <div class="form-texts">
        <div class="form-texts__title">Select chain enviroment</div>
        <div class="form-buttons-row space-between">
          <button
            class="btn"
            v-bind:class="{ 'btn-active': activeDecimalUrl === 'Devnet' }"
            @click="decimalConstructor(restUrlArray[0], 'Devnet')"
          >
            Devnet
          </button>
          <button
            class="btn"
            v-bind:class="{ 'btn-active': activeDecimalUrl === 'Testnet' }"
            @click="decimalConstructor(restUrlArray[0], 'Testnet')"
          >
            Testnet
          </button>
          <button
            class="btn"
            v-bind:class="{ 'btn-active': activeDecimalUrl === 'Mainnet' }"
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
        <textarea
          name="unsignedTx"
          id="unsignedTx"
          rows="4"
          v-model="unsignedTxStringify"
        ></textarea>
        <div class="form-submit">
          <button class="btn btn-active">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import txTypes from "@/assets/txTypes";
import { Decimal } from "decimal-js-sdk";

export default {
  name: "MainForm",
  components: {},
  data() {
    return {
      unsignedTx: {},
      txTypes,
      decimal: null,
      activeDecimalUrl: "Devnet",
      activeTxType: null,
      restUrlArray: [
        "https://devnet-gate.decimalchain.com/api/rpc/",
        "https://testnet-gate.decimalchain.com/api/rpc/",
        "https://mainnet-gate.decimalchain.com/api/rpc/",
      ],
    };
  },
  computed: {
    unsignedTxStringify: function () {
      return JSON.stringify(this.unsignedTx, undefined, 2);
    },
  },
  methods: {
    changeActiveTxType(txType) {
      this.activeTxType = txType;
      this.unsignedTx = JSON.parse(JSON.stringify(txTypes[txType]));
    },
    decimalConstructor(restURL, chain) {
      const decimalOptions = {
        restURL,
      };
      this.activeDecimalUrl = chain;
      this.decimal = new Decimal(decimalOptions);
    },
  },
};
</script>

<style lang="scss">
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

  &-texts {
    color: rgba(224, 224, 255, 0.6);
    line-height: 18px;
    font-weight: 400;
    font-size: 12px;

    &__title {
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      color: #fff;
    }
  }

  &-submit {
    text-align: center;
    padding: 20px;
  }

  &-editor {
    textarea {
      background-color: #2d2f33;
      color: hsla(0, 0%, 100%, 0.6);
      width: 100%;
      resize: none;
      height: 30vh;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid transparent;
    }
  }

  &-button {
    text-align: right;
  }

  &-buttons {
    &-row {
      button {
        margin: 10px 20px;
      }
    }

    &-inline {
      display: flex;
      flex-wrap: wrap;
    }
  }
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

  &-inline {
    color: #0bf;
    border: 1px solid #0bf;
    background: rgba(0, 187, 255, 0.03);
    margin: 5px;
    padding: 5px;
    border-radius: 8px;
  }

  &-active {
    color: #fff;
    background: #0bf;
  }
}
</style>

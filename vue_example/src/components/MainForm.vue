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
          <button class="btn btn-active">Devnet</button>
          <button class="btn">Testnet</button>
          <button class="btn">Mainnet</button>
        </div>
      </div>
    </div>

    <div class="form">
      <div class="form-buttons-inline">
        <button v-for="(txType, index) in txTypes" :key="'type_' + index">
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
export default {
  name: "MainForm",
  components: {},
  data() {
    return {
      txTypes: [
        "coin/buy_coin",
        "coin/create_coin",
        "coin/update_coin",
        "coin/sell_coin",
        "coin/send_coin",
        "coin/multi_send_coin",
        "coin/sell_all_coin",
        "coin/redeem_check",
        "coin/issue_check",
        "validator/declare_candidate",
        "validator/delegate",
        "validator/set_online",
        "validator/set_offline",
        "validator/unbond",
        "validator/delegate_nft",
        "validator/unbond_nft",
        "multisig/create_wallet",
        "multisig/create_transaction",
        "multisig/sign_transaction",
        "cosmos-sdk/MsgSubmitProposal",
        "cosmos-sdk/MsgVote",
        "nft/msg_mint",
        "nft/msg_burn",
        "nft/msg_edit_metadata",
        "nft/msg_transfer",
        "swap/msg_initialize",
        "swap/msg_redeem_v2",
      ],
      unsignedTx: {
        msgs: {
          type: "coin/send",
          value: {
            recipient: "asdasd",
            coin: {
              denom: "del",
              amount: 1000000000,
            },
          },
        },
      },
    };
  },

  computed: {
    unsignedTxStringify: function () {
      return JSON.stringify(this.unsignedTx, undefined, 2);
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

      button {
        color: #0bf;
        border: 1px solid #0bf;
        background: rgba(0, 187, 255, 0.03);
        margin: 5px;
        padding: 5px;
        border-radius: 8px;
      }
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

  &-active {
    color: #fff;
    background: #0bf;
  }
}
</style>

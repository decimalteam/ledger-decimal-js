"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var bech32 = _interopRequireWildcard(require("bech32-buffer"));
var _jsSha = _interopRequireDefault(require("js-sha3"));
var _secp256k = require("secp256k1");
var _helperV = require("./helperV1");
var _helperV2 = require("./helperV2");
var _common = require("./common");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** ******************************************************************************
 *  (c) 2019 ZondaX GmbH
 *  (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ******************************************************************************* */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
var DecimalApp = /*#__PURE__*/function () {
  function DecimalApp(transport) {
    var scrambleKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _common.APP_KEY;
    (0, _classCallCheck2.default)(this, DecimalApp);
    if (!transport) {
      throw new Error("Transport has not been defined");
    }
    this.transport = transport;
    transport.decorateAppAPIMethods(this, ["getVersion", "sign", "getAddressAndPubKey", "appInfo", "deviceInfo", "getBech32FromPK"], scrambleKey);
  }
  (0, _createClass2.default)(DecimalApp, [{
    key: "serializePath",
    value: function () {
      var _serializePath = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(path) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _common.getVersion)(this.transport);
            case 2:
              this.versionResponse = _context.sent;
              _context.t0 = this.versionResponse.major;
              _context.next = _context.t0 === 1 ? 6 : _context.t0 === 2 ? 7 : 8;
              break;
            case 6:
              return _context.abrupt("return", (0, _helperV.serializePathv1)(path));
            case 7:
              return _context.abrupt("return", (0, _helperV2.serializePathv2)(path));
            case 8:
              return _context.abrupt("return", {
                return_code: 0x6400,
                error_message: "App Version is not supported"
              });
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function serializePath(_x) {
        return _serializePath.apply(this, arguments);
      }
      return serializePath;
    }()
  }, {
    key: "signGetChunks",
    value: function () {
      var _signGetChunks = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path, message) {
        var serializedPath, chunks, buffer, i, end;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.serializePath(path);
            case 2:
              serializedPath = _context2.sent;
              chunks = [];
              chunks.push(serializedPath);
              buffer = Buffer.from(message);
              for (i = 0; i < buffer.length; i += _common.CHUNK_SIZE) {
                end = i + _common.CHUNK_SIZE;
                if (i > buffer.length) {
                  end = buffer.length;
                }
                chunks.push(buffer.slice(i, end));
              }
              return _context2.abrupt("return", chunks);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function signGetChunks(_x2, _x3) {
        return _signGetChunks.apply(this, arguments);
      }
      return signGetChunks;
    }()
  }, {
    key: "getVersion",
    value: function () {
      var _getVersion2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _common.getVersion)(this.transport);
            case 2:
              this.versionResponse = _context3.sent;
              return _context3.abrupt("return", this.versionResponse);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getVersion() {
        return _getVersion2.apply(this, arguments);
      }
      return getVersion;
    }()
  }, {
    key: "appInfo",
    value: function () {
      var _appInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", this.transport.send(0xb0, 0x01, 0, 0).then(function (response) {
                var errorCodeData = response.slice(-2);
                var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                var result = {};
                var appName = "err";
                var appVersion = "err";
                var flagLen = 0;
                var flagsValue = 0;
                if (response[0] !== 1) {
                  // Ledger responds with format ID 1. There is no spec for any format != 1
                  result.error_message = "response format ID not recognized";
                  result.return_code = 0x9001;
                } else {
                  var appNameLen = response[1];
                  appName = response.slice(2, 2 + appNameLen).toString("ascii");
                  var idx = 2 + appNameLen;
                  var appVersionLen = response[idx];
                  idx += 1;
                  appVersion = response.slice(idx, idx + appVersionLen).toString("ascii");
                  idx += appVersionLen;
                  var appFlagsLen = response[idx];
                  idx += 1;
                  flagLen = appFlagsLen;
                  flagsValue = response[idx];
                }
                return {
                  return_code: returnCode,
                  error_message: (0, _common.errorCodeToString)(returnCode),
                  // //
                  appName: appName,
                  appVersion: appVersion,
                  flagLen: flagLen,
                  flagsValue: flagsValue,
                  // eslint-disable-next-line no-bitwise
                  flag_recovery: (flagsValue & 1) !== 0,
                  // eslint-disable-next-line no-bitwise
                  flag_signed_mcu_code: (flagsValue & 2) !== 0,
                  // eslint-disable-next-line no-bitwise
                  flag_onboarded: (flagsValue & 4) !== 0,
                  // eslint-disable-next-line no-bitwise
                  flag_pin_validated: (flagsValue & 128) !== 0
                };
              }, _common.processErrorResponse));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function appInfo() {
        return _appInfo.apply(this, arguments);
      }
      return appInfo;
    }()
  }, {
    key: "deviceInfo",
    value: function () {
      var _deviceInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", this.transport.send(0xe0, 0x01, 0, 0, Buffer.from([]), [0x9000, 0x6e00]).then(function (response) {
                var errorCodeData = response.slice(-2);
                var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                if (returnCode === 0x6e00) {
                  return {
                    return_code: returnCode,
                    error_message: "This command is only available in the Dashboard"
                  };
                }
                var targetId = response.slice(0, 4).toString("hex");
                var pos = 4;
                var secureElementVersionLen = response[pos];
                pos += 1;
                var seVersion = response.slice(pos, pos + secureElementVersionLen).toString();
                pos += secureElementVersionLen;
                var flagsLen = response[pos];
                pos += 1;
                var flag = response.slice(pos, pos + flagsLen).toString("hex");
                pos += flagsLen;
                var mcuVersionLen = response[pos];
                pos += 1;
                // Patch issue in mcu version
                var tmp = response.slice(pos, pos + mcuVersionLen);
                if (tmp[mcuVersionLen - 1] === 0) {
                  tmp = response.slice(pos, pos + mcuVersionLen - 1);
                }
                var mcuVersion = tmp.toString();
                return {
                  return_code: returnCode,
                  error_message: (0, _common.errorCodeToString)(returnCode),
                  // //
                  targetId: targetId,
                  seVersion: seVersion,
                  flag: flag,
                  mcuVersion: mcuVersion
                };
              }, _common.processErrorResponse));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function deviceInfo() {
        return _deviceInfo.apply(this, arguments);
      }
      return deviceInfo;
    }()
  }, {
    key: "publicKey",
    value: function () {
      var _publicKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(path) {
        var serializedPath, data;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.serializePath(path);
            case 2:
              serializedPath = _context6.sent;
              _context6.t0 = this.versionResponse.major;
              _context6.next = _context6.t0 === 1 ? 6 : _context6.t0 === 2 ? 7 : 9;
              break;
            case 6:
              return _context6.abrupt("return", (0, _helperV.publicKeyv1)(this, serializedPath));
            case 7:
              data = Buffer.concat([DecimalApp.serializeHRP("dx"), serializedPath]);
              return _context6.abrupt("return", (0, _helperV2.publicKeyv2)(this, data));
            case 9:
              return _context6.abrupt("return", {
                return_code: 0x6400,
                error_message: "App Version is not supported"
              });
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function publicKey(_x4) {
        return _publicKey.apply(this, arguments);
      }
      return publicKey;
    }()
  }, {
    key: "getAddressAndPubKey",
    value: function () {
      var _getAddressAndPubKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(path, hrp) {
        var serializedPath, data;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.serializePath(path);
            case 2:
              serializedPath = _context7.sent;
              data = Buffer.concat([DecimalApp.serializeHRP(hrp), serializedPath]);
              return _context7.abrupt("return", this.transport.send(_common.CLA, _common.INS.GET_ADDR_SECP256K1, 0, 0, data, [0x9000]).then(function (response) {
                var errorCodeData = response.slice(-2);
                var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                var compressedPk = Buffer.from(response.slice(0, 33));
                var bech32Address = Buffer.from(response.slice(33, -2)).toString();
                return {
                  bech32_address: bech32Address,
                  compressed_pk: compressedPk,
                  return_code: returnCode,
                  error_message: (0, _common.errorCodeToString)(returnCode)
                };
              }, _common.processErrorResponse));
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getAddressAndPubKey(_x5, _x6) {
        return _getAddressAndPubKey.apply(this, arguments);
      }
      return getAddressAndPubKey;
    }()
  }, {
    key: "showAddressAndPubKey",
    value: function () {
      var _showAddressAndPubKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(path, hrp) {
        var serializedPath, data;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.serializePath(path);
            case 2:
              serializedPath = _context8.sent;
              data = Buffer.concat([DecimalApp.serializeHRP(hrp), serializedPath]);
              return _context8.abrupt("return", this.transport.send(_common.CLA, _common.INS.GET_ADDR_SECP256K1, 1, 0, data, [0x9000]).then(function (response) {
                var errorCodeData = response.slice(-2);
                var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                var compressedPk = Buffer.from(response.slice(0, 33));
                var bech32Address = Buffer.from(response.slice(33, -2)).toString();
                return {
                  bech32_address: bech32Address,
                  compressed_pk: compressedPk,
                  return_code: returnCode,
                  error_message: (0, _common.errorCodeToString)(returnCode)
                };
              }, _common.processErrorResponse));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function showAddressAndPubKey(_x7, _x8) {
        return _showAddressAndPubKey.apply(this, arguments);
      }
      return showAddressAndPubKey;
    }()
  }, {
    key: "signSendChunk",
    value: function () {
      var _signSendChunk = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(chunkIdx, chunkNum, chunk) {
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.t0 = this.versionResponse.major;
              _context9.next = _context9.t0 === 1 ? 3 : _context9.t0 === 2 ? 4 : 5;
              break;
            case 3:
              return _context9.abrupt("return", (0, _helperV.signSendChunkv1)(this, chunkIdx, chunkNum, chunk));
            case 4:
              return _context9.abrupt("return", (0, _helperV2.signSendChunkv2)(this, chunkIdx, chunkNum, chunk));
            case 5:
              return _context9.abrupt("return", {
                return_code: 0x6400,
                error_message: "App Version is not supported"
              });
            case 6:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function signSendChunk(_x9, _x10, _x11) {
        return _signSendChunk.apply(this, arguments);
      }
      return signSendChunk;
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(path, message) {
        var _this = this;
        var chunks;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.signGetChunks(path, message);
            case 2:
              chunks = _context11.sent;
              return _context11.abrupt("return", this.signSendChunk(1, chunks.length, chunks[0], [0x9000]).then( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(response) {
                  var result, i;
                  return _regenerator.default.wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        result = {
                          return_code: response.return_code,
                          error_message: response.error_message,
                          signature: null
                        };
                        i = 1;
                      case 2:
                        if (!(i < chunks.length)) {
                          _context10.next = 11;
                          break;
                        }
                        _context10.next = 5;
                        return _this.signSendChunk(1 + i, chunks.length, chunks[i]);
                      case 5:
                        result = _context10.sent;
                        if (!(result.return_code !== 0x9000)) {
                          _context10.next = 8;
                          break;
                        }
                        return _context10.abrupt("break", 11);
                      case 8:
                        i += 1;
                        _context10.next = 2;
                        break;
                      case 11:
                        return _context10.abrupt("return", {
                          return_code: result.return_code,
                          error_message: result.error_message,
                          // ///
                          signature: result.signature
                        });
                      case 12:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x14) {
                  return _ref.apply(this, arguments);
                };
              }(), _common.processErrorResponse));
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function sign(_x12, _x13) {
        return _sign.apply(this, arguments);
      }
      return sign;
    }()
  }], [{
    key: "serializeHRP",
    value: function serializeHRP(hrp) {
      if (hrp == null || hrp.length < 2 || hrp.length > 83) {
        throw new Error("Invalid HRP");
      }
      var buf = Buffer.alloc(1 + hrp.length);
      buf.writeUInt8(hrp.length, 0);
      buf.write(hrp, 1);
      return buf;
    }
  }, {
    key: "getBech32FromPK",
    value: function getBech32FromPK(hrp, pk) {
      if (pk.length !== 33) {
        throw new Error("expected compressed public key [31 bytes]");
      }
      var decompressedPublicKey = (0, _secp256k.publicKeyConvert)(pk, false);
      var slicedDecompressedPublicKey = decompressedPublicKey.slice(1);
      var hexedDecompressedPublicKey = _jsSha.default.keccak256(slicedDecompressedPublicKey);
      var evmAccountAddress = "0x".concat(hexedDecompressedPublicKey.substring(hexedDecompressedPublicKey.length - 40, hexedDecompressedPublicKey.length));
      console.log(evmAccountAddress);
      var formattedEvmAccountAddress = evmAccountAddress.startsWith("0x") ? evmAccountAddress.slice(2) : evmAccountAddress;
      var bufferedEvmAccountAddress = Buffer.from(formattedEvmAccountAddress, "hex");
      return bech32.encode(hrp, bufferedEvmAccountAddress);
    }
  }]);
  return DecimalApp;
}();
exports.default = DecimalApp;
//https://github.com/microsoft/onnxruntime-inference-examples/blob/main/js/quick-start_onnxruntime-web-script-tag/index_esm.html

//https://github.com/microsoft/onnxruntime-inference-examples/blob/main/js/quick-start_onnxruntime-web-script-tag/index.html

//https://stackoverflow.com/questions/71259717/how-to-load-an-onnx-model-using-onnx-js

//https://onnxruntime.ai/docs/api/js/interfaces/InferenceSession-1.html#inputNames

import * as t from "./connect4_module.js";

import * as ort from "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/esm/ort.min.js";
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
ort.env.wasm.numThreads = 1;

console.time("loading model");
const session = await ort.InferenceSession.create("./onnx_model.onnx");
console.timeEnd("loading model");
console.log("model loaded");

function transformer(state) {
  return [
    state.map((row) => row.map((x) => (x === -1 ? 1 : 0))),
    state.map((row) => row.map((x) => (x === 0 ? 1 : 0))),
    state.map((row) => row.map((x) => (x === 1 ? 1 : 0))),
  ];
}

function softmax(arr) {
  // Calculate the sum of the exponential values of the array
  let sum = arr.reduce((acc, val) => acc + Math.exp(val), 0);

  // Calculate the softmax values for each element in the array
  let softmax = arr.map((val) => Math.exp(val) / sum);

  return softmax;
}

const game = new t.Connect4();
var state;
state = game.get_initial_state();
state = game.get_next_state(state, 3, -1);
state = game.get_next_state(state, 3, -1);
state = game.get_next_state(state, 3, -1);
state = game.get_next_state(state, 4, 1);
state = game.get_next_state(state, 2, 1);
state = game.get_next_state(state, 5, 1);

console.log(state);

const encodedstate = transformer(state);
console.log(encodedstate);

function flatten3DArray(arr) {
  return arr.flat(2);
}

const c = flatten3DArray(encodedstate);
console.log(c);

const tensorA = new ort.Tensor("float32", c, [1, 3, 6, 7]);

console.log(tensorA);
console.log(session.inputNames);
const feeds = { "input.1": tensorA };
console.log(session.outputNames);
const results = await session.run(feeds);

const value = Array.from(results["228"].data);
console.log(value);
const policy = Array.from(results["222"].data);
console.log(policy);
const policy_np = softmax(policy);
console.log(policy_np);

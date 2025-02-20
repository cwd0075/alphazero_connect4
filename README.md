# alphazero_connect4
Alphazero from Scratch by freeCodeCamp Ch.8 and later  

https://www.youtube.com/watch?v=wuSQpLinRB4  

### To git commit all changes in the Codespaces:  
git add *  
git commit -m "update readme.md"  
git push  

### Part 1 Connect4    
To run the code in Google Colab:  
copy connect4_part1_colab.ipynb to Google Drive and run the cells  

To do further training on current weight in Google Colab:  
copy connect4_part1_colab_continue_training.ipynb to Google Drive and run the cells  

To run the code in Github Codespaces:  
Start Codespaces  
pip install tqdm  
python connect4_part1.py    

code update from:  
https://github.com/cwd0075/alphazero/blob/main/alpha_tweaks_part7.py  
https://github.com/cwd0075/alphazero/blob/main/alpha_tweaks_part7_colab.ipynb  

code update:  
update TicTacToe class to ConnectFour class  
update the ResNet model size  
update train arguments  

### Part 2 Parallel running selfPlay using Ray instead of AlphaParallel    
To run the code in Google Colab:  
copy connect4_part2_Ray_colab.ipynb to Google Drive and run the cells  

code update:  
code update from connect4_part1_colab.ipynb  
Ray cannot be used on Class function, so I convert Alphazero class function into normal function  
https://stackoverflow.com/questions/64321153/how-to-use-ray-parallelism-within-a-class-in-python  

AlphaZerofromScratch AlphaParallel purpose: batch model inference instead of one row a time. It run n mcts search at the same time and collect n row of states to do batch inference on gpu.  
But very complicate, so i don't implement  

Ray Reference:  
Ray demo notebook: Ray.ipynb  
https://stackoverflow.com/questions/54490647/ray-how-to-run-many-actors-on-one-gpu  
https://docs.ray.io/en/latest/ray-core/examples/gentle_walkthrough.html  
https://docs.ray.io/en/latest/ray-core/examples/highly_parallel.html   
https://docs.ray.io/en/latest/ray-core/examples/monte_carlo_pi.html   
http://www.andrewjanowczyk.com/ray-an-open-source-api-for-easy-scalable-distributed-computing-in-python-part-1-local-scaling/  


### Run 10 game on Vast.ai, prefer choice RTX 3070 or Titan V, no need multiple card:  

1 GPU 1x RTX 3070 (6 cpu, $0.119)  
Ray 0.2 GPU 158s   
Alpha parallel 121s   

1 GPU 1x RTX 3070 (15 cpu, $0.126)   
Ray 0.2 GPU 74.4s, 102s  
Alpha parallel 85.5  

1 GPU 1x Titan V (15 cpu, $0.156)  
Ray 0.2 GPU 113s  
Alpha parallel 83s  

1 GPU 1x RTX 4070 Ti (13 cpu, $0.256)  
Ray 0.2 GPU 91s 90s  
Alpha parallel 89s  

### Part 3 Convert to Onnx Model  
To run the code in Google Colab:  
copy connect4_part3_to_onnx_colab.ipynb to Google Drive and run all cells  
onnx_model.onnx is the converted model from model_7_ConnectFour.pt  

code update:  
code update from connect4_part1_colab.ipynb  
other modifications:  
copy the changes in cwd0075/alphazero/alpha_tweaks_to_onnx_colab.ipynb  

### Part 4 Running the Onnx Model on Javascript  
To run:  
Download https://github.com/cwd0075/connect4_gui_alphazero  
Copy onnx_model.onnx, onnx.html and onnx_test.js to the connect4_gui_alphazero directory  
Just run onnx.html on a local web server, in the browser inspect console panel to see the console.log output,  
fail to run on local nodejs because it requires to use brower wasm  
I run on VS Code Live Server locally (see Note: Setup javascript development environment on Windows)  

code update:  
code update and copy from cwd0075/alphazero/onnx_test.js  

### Part 5 MCTS vs Alphazero competition (MCTS_vs_Alphazero Folder)   
MCTS_vs_Alphazero/connect4_Ray_selfplay_mcts_vs_Alphazero_colab.ipynb, using Ray 4x faster   
MCTS_vs_Alphazero/connect4_selfplay_mcts_vs_Alphazero_colab.ipynb, without using Ray  

MCTS(10000 search) vs AlphaZero(100 search): MCTS_win: 44 / Draw: 15 / AlphaZero_win: 41  (50 games MCTS start first, 50 games AlphaZero start first)    
MCTS(100000 search) vs AlphaZero(100 search): MCTS_win: 29 / Draw: 3 / AlphaZero_win: 8  (20 games MCTS start first, 20 games AlphaZero start first)  
MCTS(100000 search) vs AlphaZero(600 search): MCTS_win: 9 / Draw: 0 / AlphaZero_win: 1  (1 GPU 1x RTX 3070 (15 cpu, $0.126) run 1600s on vast.ai)    

### Misc  
AlphaZero benchmark against a perfect Connect 4 Solver  
https://jonathan-laurent.github.io/AlphaZero.jl/dev/tutorial/connect_four/  

Train the value and policy network using the perfect Connect 4 Solver dataset  
https://www.kaggle.com/code/connect4alphazero/alphazero-baseline-connectx  
  




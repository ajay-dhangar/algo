--- 
id: beam-search  
title: Beam Search Algorithm  
sidebar_label: Beam Search  
description: "This guide covers the Beam Search algorithm, a heuristic search technique commonly used in sequence generation tasks to find the most probable output sequence in machine learning."  
tags: [machine learning, search algorithm, beam search, NLP, transformer]
---

### Definition:
**Beam Search** is a heuristic search algorithm that is widely used in sequence prediction tasks to find the most likely sequence of outputs by considering multiple candidates at each step. Beam Search is particularly useful in applications like language translation, speech recognition, and image captioning where the goal is to generate coherent, accurate sequences based on probabilities.

### Characteristics:
- **Heuristic Search**:  
  Beam Search uses a probabilistic approach, evaluating multiple partial sequences at each time step and discarding less likely candidates.
- **Controlled Exploration**:  
  Beam Search keeps a fixed number of candidates at each step, called the "beam width," balancing between search breadth and computational efficiency.
- **Greedy Yet Flexible**:  
  Unlike pure greedy search, Beam Search maintains multiple candidates, allowing it to recover from locally optimal but globally suboptimal choices.

### Components of Beam Search:
1. **Beam Width (k)**:  
   The beam width determines the number of candidate sequences kept at each time step. A higher beam width allows more paths to be considered but requires more computational resources.
2. **Score Calculation**:  
   Beam Search calculates scores for each candidate sequence by combining the probability of the sequence with additional metrics like length normalization.
3. **Pruning**:  
   At each time step, Beam Search keeps only the top `k` sequences with the highest scores, discarding the rest to manage computational efficiency.
4. **Termination Condition**:  
   The algorithm stops when all selected sequences reach an end condition, such as a specified token (`<end>` token in NLP tasks) or a maximum length.

### Beam Search Architecture:
1. **Input Sequence**:  
   The model is provided with an initial input sequence, usually a `<start>` token for text generation tasks, to begin predicting the output sequence.
2. **Candidate Expansion**:  
   For each candidate sequence in the beam, the model generates probabilities for the next token in the sequence.
3. **Pruning**:  
   The algorithm keeps only the `k` most likely sequences at each time step, maintaining only the highest-scoring candidates.
4. **Output Selection**:  
   When the search reaches the termination condition, Beam Search outputs the sequence with the highest score among the final candidates.

### Problem Statement:
Given an initial input sequence and a model that can predict probabilities for the next token in a sequence, the goal of Beam Search is to generate the most probable sequence of tokens. This is achieved by exploring multiple possible paths and discarding less probable ones to optimize search efficiency while maintaining high-quality results.

### Key Concepts:
- **Sequence Probability**:  
  The overall probability of a sequence is calculated as the product of the probabilities of each token in the sequence. Beam Search aims to maximize this probability.
- **Beam Width (k)**:  
  Beam width controls the number of candidates explored at each step. Higher beam widths can improve output quality but also increase computation.
- **Normalization**:  
  Length normalization can be applied to avoid bias toward shorter or longer sequences, depending on the task.
- **Pruning Mechanism**:  
  Pruning reduces the search space by keeping only the top `k` candidates, discarding sequences with lower probabilities to manage computation.

### Steps Involved in Beam Search:
1. **Initialize Beam**:  
   Start with the initial input token (e.g., `<start>` in text generation) and calculate the initial probabilities for possible first tokens.
2. **Generate Candidates**:  
   For each sequence in the beam, generate possible next tokens and calculate their probabilities.
3. **Score and Prune**:  
   Compute scores for each candidate sequence by combining the probabilities of tokens in the sequence. Retain only the top `k` sequences.
4. **Repeat Until Termination**:  
   Continue expanding, scoring, and pruning until the sequences reach the end condition.
5. **Select Final Output**:  
   Output the sequence with the highest score among the remaining candidates.

### Example:
```python
import torch
import torch.nn.functional as F

def beam_search(model, start_token, end_token, beam_width, max_length):
    # Initialize the beam with the start token
    beam = [(start_token, 0.0)]  # (sequence, score)
    
    for _ in range(max_length):
        new_beam = []
        
        # Expand each sequence in the current beam
        for seq, score in beam:
            # Stop expanding if end token is reached
            if seq[-1] == end_token:
                new_beam.append((seq, score))
                continue
            
            # Predict next token probabilities
            predictions = model(torch.tensor([seq]))
            probs = F.log_softmax(predictions[-1], dim=-1)
            
            # Get top beam_width tokens
            top_tokens = torch.topk(probs, beam_width)
            
            # Add each top token to the new beam
            for token, token_prob in zip(top_tokens.indices, top_tokens.values):
                new_seq = seq + [token.item()]
                new_score = score + token_prob.item()  # Add log-probability
                new_beam.append((new_seq, new_score))
        
        # Prune to keep only top beam_width sequences
        new_beam = sorted(new_beam, key=lambda x: x[1], reverse=True)[:beam_width]
        beam = new_beam
    
    # Return the sequence with the highest score
    return max(beam, key=lambda x: x[1])[0]

# Example usage
start_token = 0  # example start token
end_token = 1  # example end token
beam_width = 3
max_length = 10

# Simulate a model function
def model(input_seq):
    # Dummy model function returning random probabilities for simplicity
    return torch.randn(len(input_seq) + 1, 5000)

output_sequence = beam_search(model, [start_token], end_token, beam_width, max_length)
print("Output Sequence:", output_sequence)

```

### Summary & Applications of Beam Search:
- **Language Translation**:
  Beam Search is frequently used in neural machine translation to generate coherent translations by maximizing the probability of the output sequence.
- **Speech Recognition**:
  Beam Search helps select the most likely sequence of phonemes or words in automatic speech recognition.
- **Image Captioning**:
  In image captioning, Beam Search is used to generate descriptive captions by exploring multiple candidate captions.
- **Text Summarization**:
  Beam Search aids in summarizing texts by generating summary sequences with high probabilities, balancing informativeness and coherence.

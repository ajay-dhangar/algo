---
id: document-query-llamaindex
title: Document Query System with LlamaIndex and LLM Integration
sidebar_label: Document Query
sidebar_position: 2
description: A system to query documents using LlamaIndex and integrate it with large language models.
tags: [LlamaIndex, LLM, Document Query, LangChain]
---



# 📖 Document Query System with LlamaIndex and LLM Integration 🚀

Welcome to the **Document Query System** project! This repository demonstrates how to use **LlamaIndex** along with a **Vector Store** and **Large Language Models (LLMs)** to perform efficient document retrieval and query generation using PDF files or web pages. 📑✨

---

## 🛠️ **Project Overview**

This project is built using **LlamaIndex** and integrates with **Hugging Face Embeddings** and **LLMs** to create an efficient document query system. We index the documents, store the context, and retrieve relevant information via a query engine.

### 🔑 **Key Features**
- 🌐 **Web URL or PDF as a Data Source**: Ingest and index data from web pages or PDFs.
- 🔍 **Efficient Retrieval**: Use **Vector Store Indexing** to efficiently retrieve document embeddings.
- 🤖 **LLM Responses**: Utilize LLMs to generate responses based on the retrieved context.
- 📂 **Persistent Directory**: Save embeddings and indexes for reusability, avoiding redundant computations.

---
## 🔧 **Installation** 

To get started, clone this repository and install the required packages:

```bash
!pip -q install llama-index langchain llama-index-readers-web llama-index-embeddings-langchain llama-index-llms-huggingface langchain-community

 ```

---
id: llama-index-code
title: Llama Index Code Implementation
sidebar_label: Code Implementation
sidebar_position: 1
description: Code for using LlamaIndex in a document query system.
tags: [LlamaIndex, Code, LangChain]
---

## Llama Index

Llama Index is a Large Language Model (LLM) framework designed for
efficient LLM application development, particularly in search and
retrieval tasks. It indexes documents by breaking them into smaller
nodes and creates embeddings with service context, storing them in a
non-redundant manner. This framework enhances retrieval by using a query
engine to find relevant documents and passing the prompt along with the
retrieved context to the LLM for response generation. Llama Index is
optimized for speed and efficiency in data lookup.

In this notebook, we will create a project using a Website URL as a data
source and an embedding model to generate numerical embeddings stored in
a vector store, utilizing a persist directory to avoid redundant
storage. We will also define a retriever and an LLM to generate
responses using the context from the query engine.

[Link](https://docs.llamaindex.ai/en/stable/) to the Llama Index
documentation

## Installing the Packages

``` python
!pip -q install llama-index langchain llama-index-readers-web llama-index-embeddings-langchain llama-index-llms-huggingface langchain-community
```


## Providing Access Token

-   To get your personal access token from HuggingFace Hub, vist
    [here](https://huggingface.co/settings/tokens)
-   **Note** - if you do not have an account in Huggingface Hub, create
    one by signing up.
-   Click the \"New Token\" button at the bottom to create a new token.
    Copy the token and paste it after running the next code block.

``` python
import os
from getpass import getpass
HF_TOKEN = getpass()
os.environ['HUGGINGFACEHUB_API_TOKEN'] = HF_TOKEN
```

## Importing the required Packages

-   [Vector Store
    Index](https://docs.llamaindex.ai/en/stable/module_guides/indexing/vector_store_index/)
-   [Simple Directory
    Reader](https://docs.llamaindex.ai/en/stable/examples/data_connectors/simple_directory_reader/)
-   [Simple Web Page
    Reader](https://docs.llamaindex.ai/en/stable/examples/data_connectors/WebPageDemo/)
-   [Service
    Context](https://docs.llamaindex.ai/en/v0.9.48/module_guides/supporting_modules/service_context.html)
-   [Storage
    Context](https://docs.llamaindex.ai/en/stable/api_reference/storage/storage_context/)
-   [Storing](https://docs.llamaindex.ai/en/stable/understanding/storing/storing/)
-   [Node
    Parsers](https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/modules/)
-   [Sentence
    Splitters](https://docs.llamaindex.ai/en/stable/api_reference/node_parsers/sentence_splitter/)
-   [Huggingface
    Embeddings](https://docs.llamaindex.ai/en/stable/examples/embeddings/huggingface/)
-   [Huggingface Inference
    API](https://docs.llamaindex.ai/en/stable/examples/llm/huggingface/)

``` python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.readers.web import SimpleWebPageReader
from llama_index.core import ServiceContext, StorageContext,load_index_from_storage
from llama_index.core.node_parser import SimpleNodeParser, MarkdownNodeParser, SentenceSplitter
from langchain.embeddings import HuggingFaceInferenceAPIEmbeddings
from llama_index.embeddings.langchain import LangchainEmbedding
from llama_index.llms.huggingface import HuggingFaceInferenceAPI
```

## Storing Context

-   defining the llm end embedding model
-   storing the context using Indexing
-   retrieving the context from the storage context

### Define:

-   **Persist Directory** - The persist directory in LlamaIndex is the
    location on disk where the indexed data and metadata are stored to
    avoid the time and cost of re-indexing the data.
-   **LLM Model** - LLM Model uses the query and the retrieved documents
    to generate a response
-   **Embedding Model** - Embedding Model generates vector embeddings
    which are to be stored in a vector store.

``` python
from llama_index.core import Settings

PERSIST_DIR = "./storage"
MODEL_NAME = "HuggingFaceH4/zephyr-7b-beta"
EMBED_MODEL = "thenlper/gte-large"

Settings.llm = HuggingFaceInferenceAPI(model_name=MODEL_NAME,
                              token=HF_TOKEN)
Settings.embed_model = LangchainEmbedding(HuggingFaceInferenceAPIEmbeddings(api_key=HF_TOKEN,
                                                                   model_name=EMBED_MODEL))
```

### Using Persist Directory

If the user uploads new data, a new directory is created. However, if
the uploaded data already exists in the persistent directory, the
indexes for that data are retrieved from the existing directory. The \"data\" used here is a directory
created within the notebook directory, which contains, just a single
[PDF
file](https://drive.google.com/file/d/1J6S9vxeiDmBPwb27t637NCW_zVeXcwrn/view?usp=sharing)

``` python
if not os.path.exists(PERSIST_DIR):
    documents = SimpleDirectoryReader("data").load_data()
    parser = SimpleNodeParser()
    nodes = parser.get_nodes_from_documents(documents)

    storage_context = StorageContext.from_defaults() #vector store
    index = VectorStoreIndex(
        nodes,
        storage_context=storage_context,
    )
    index.storage_context.persist(persist_dir=PERSIST_DIR)
else:
    storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
    index = load_index_from_storage(storage_context)
```

## Defining the Query Engine

``` python
query_engine = index.as_query_engine()
query_engine.query("what is the name of the story?")
```


## Generating responses

-   defining the response synthesizer using the service context
-   using the vector retriever and response synthesizer in the query
    engine to generate responses

``` python
from llama_index.core import get_response_synthesizer
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
```

``` python
response_synthesizer = get_response_synthesizer()
```

``` python
vector_retriever = VectorIndexRetriever(index=index, similarity_top_k=2)
```

``` python
vector_query_engine = RetrieverQueryEngine(
    retriever=vector_retriever,
    response_synthesizer=response_synthesizer,
)
```

## Getting results

``` python
print(vector_query_engine.query("what is the name of the story?"))
```


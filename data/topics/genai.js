export const genaiContent = {
  slug: "genai",
  briefDescription: [
    "Generative AI (GenAI) refers to AI systems that can generate new content — text, code, images, audio — based on patterns learned from training data. Large Language Models (LLMs) like GPT-4, Claude, and Llama are the core technology: trained on vast amounts of text, they predict the next token in a sequence. You interact with LLMs through prompts. Prompt engineering is the practice of crafting effective prompts to get better outputs: be specific and clear, provide examples (few-shot prompting), tell the model its role (system prompts), and break complex tasks into steps (chain-of-thought prompting). Temperature controls randomness: 0 = deterministic, 1+ = creative/random.",
    "LangChain is a JavaScript/Python framework for building applications powered by LLMs. It provides abstractions for: LLM providers (OpenAI, Anthropic, Ollama), prompt templates (PromptTemplate for reusable prompts with variables), output parsers (structured JSON output), chains (sequence of LLM calls and tools), memory (conversation history), and agents (LLM that decides which tools to call). RAG (Retrieval-Augmented Generation) is the pattern of giving an LLM access to your own data: embed your documents as vectors, store in a vector database (Pinecone, Weaviate, pgvector), retrieve the most relevant chunks for each query, and include them in the prompt as context.",
    "Building a GenAI application with LangChain involves: 1) connecting to an LLM provider (const model = new ChatOpenAI({ model: 'gpt-4o', temperature: 0 })), 2) creating a prompt template, 3) chaining them together, and 4) parsing the output. Embeddings convert text to high-dimensional vectors where semantically similar text clusters together — this is what powers semantic search and RAG. OpenAIEmbeddings and HuggingFaceTransformersEmbeddings are common choices. Always be mindful of token limits (context windows), API costs (price per token), and latency. Stream responses with .stream() to show output progressively instead of waiting for the full response.",
  ],
  keyConcepts: [
    "LLM (Large Language Model): predicts next tokens; examples: GPT-4o, Claude Sonnet, Llama 3",
    "Prompt engineering: system role, clear instructions, examples (few-shot), chain-of-thought",
    "Temperature: 0 = deterministic/factual, 0.7 = balanced, 1+ = creative/random",
    "Tokens: chunks of text (~4 chars each) — cost and context limits are measured in tokens",
    "LangChain: JS/Python framework — LLM connectors, prompt templates, chains, agents",
    "PromptTemplate: reusable prompt with {variable} placeholders",
    "Chain: sequence of steps — prompt → LLM → output parser",
    "Embeddings: convert text to vectors for semantic similarity search",
    "Vector database: stores embeddings — Pinecone, Weaviate, pgvector (PostgreSQL extension)",
    "RAG (Retrieval-Augmented Generation): retrieve relevant docs → inject into prompt as context",
    "Agent: LLM + tools (web search, calculator, DB) — decides autonomously which tools to call",
    "Streaming: .stream() — receive tokens progressively instead of waiting for full response",
  ],
  codeExample: {
    language: "javascript",
    title: "LangChain.js — Chat Model, Prompt Template, Chain, RAG with Vector Store",
    code: `import { ChatOpenAI } from "@langchain/openai"
import { ChatAnthropic } from "@langchain/anthropic"
import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"
import { OpenAIEmbeddings } from "@langchain/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// ── 1. Connect to an LLM ──
const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,          // 0 = precise/factual
  maxTokens: 1000,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Or use Claude
const claude = new ChatAnthropic({
  model: "claude-sonnet-4-6",
  temperature: 0.3,
})

// ── 2. Simple prompt + model + parser chain ──
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful coding tutor. Answer concisely in plain English."],
  ["human", "{question}"],
])

const outputParser = new StringOutputParser()

const chain = RunnableSequence.from([prompt, model, outputParser])

const answer = await chain.invoke({
  question: "What is the difference between let and const in JavaScript?",
})
console.log(answer)

// ── 3. Streaming response ──
const stream = await chain.stream({ question: "Explain async/await" })
for await (const chunk of stream) {
  process.stdout.write(chunk)  // prints tokens as they arrive
}

// ── 4. Prompt template with multiple variables ──
const reviewPrompt = PromptTemplate.fromTemplate(\`
You are a code reviewer. Review the following {language} code.
Focus on: {focus}
Code:
{code}
Provide a brief review with specific improvements.
\`)

const review = await RunnableSequence.from([reviewPrompt, model, outputParser]).invoke({
  language: "JavaScript",
  focus: "performance and readability",
  code: \`function getUsers() {
    const users = []
    for (let i = 0; i < data.length; i++) {
      users.push(data[i].name)
    }
    return users
  }\`,
})

// ── 5. RAG — index your own docs and query them ──
const documents = [
  "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
  "Express is a minimal web framework for Node.js.",
  "Prisma is a type-safe ORM for Node.js and TypeScript.",
]

// Split docs into chunks
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 20 })
const chunks = await splitter.createDocuments(documents)

// Embed and store in vector store
const embeddings = new OpenAIEmbeddings()
const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings)

// RAG chain
const ragPrompt = ChatPromptTemplate.fromMessages([
  ["system", "Answer using ONLY the provided context. If unsure, say so.\\n\\nContext:\\n{context}"],
  ["human", "{question}"],
])

async function askWithRAG(question) {
  const relevantDocs = await vectorStore.similaritySearch(question, 3)
  const context = relevantDocs.map(d => d.pageContent).join("\\n---\\n")
  return RunnableSequence.from([ragPrompt, model, outputParser]).invoke({ context, question })
}

const ragAnswer = await askWithRAG("What is Prisma used for?")
console.log(ragAnswer)`,
  },
}

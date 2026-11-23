import { 
  HubCapability, 
  ArchitectureLayer, 
  TechnicalComponent, 
  TimelineMilestone, 
  PipelineStage, 
  ApplicationDomain, 
  ComparisonDimension, 
  FuturePillar, 
  QuizQuestion, 
  GlossaryItem, 
  AcademicReference 
} from '../types';

export const CORE_DEFINITION = {
  title: "Generative Pre-trained Transformer",
  acronym: "GPT",
  definition: "A family of state-of-the-art autoregressive neural network architectures developed by OpenAI designed to process, contextualize, and generate human-like natural language, structured code, and multi-modal information.",
  autoregressiveAxiom: "Autoregressive generation: Predicts the probability distribution of the next token conditioned strictly on preceding context tokens.",
  formula: "P(w_1, w_2, ..., w_T) = \\prod_{t=1}^T P(w_t \\mid w_1, ..., w_{t-1})",
  criticalDistinction: {
    gpt: "The foundational mathematical neural model family (deep neural network weights, attention heads, transformer layers).",
    chatgpt: "The consumer software product, user interface, guardrails, orchestration layers, and interactive chat application built on top of the GPT models."
  }
};

export const HUB_CAPABILITIES: HubCapability[] = [
  {
    id: "text-gen",
    title: "Text Generation",
    description: "Produces contextually coherent, stylistically nuanced prose, essays, documentation, and creative narratives with high topical consistency.",
    examplePrompt: "Draft an executive summary explaining the strategic value of generative AI for enterprise automation.",
    exampleOutput: "Enterprise generative AI transforms unstructured workflows into streamlined intelligence pipelines. By automating document synthesis, code generation, and multi-turn customer resolution, organizations reduce operational latency by up to 40% while unlocking high-fidelity data extraction.",
    iconName: "FileText",
    tag: "Core Capability"
  },
  {
    id: "code-gen",
    title: "Code Generation",
    description: "Translates natural language specifications into multi-language source code, unit tests, refactoring suggestions, and algorithmic logic.",
    examplePrompt: "Write a Python function to compute the moving average of an array with window size k.",
    exampleOutput: "def moving_average(values: list[float], k: int) -> list[float]:\n    if k <= 0 or k > len(values):\n        return []\n    window_sum = sum(values[:k])\n    result = [window_sum / k]\n    for i in range(k, len(values)):\n        window_sum += values[i] - values[i - k]\n        result.append(window_sum / k)\n    return result",
    iconName: "Code2",
    tag: "Software Engineering"
  },
  {
    id: "reasoning",
    title: "Reasoning & Problem Solving",
    description: "Decomposes multi-step analytical dilemmas, mathematical proofs, and logic puzzles using chain-of-thought inductive pathways.",
    examplePrompt: "A container has 12 red balls and 8 blue balls. If two balls are drawn sequentially without replacement, what is the probability that both are red?",
    exampleOutput: "Step 1: P(First is Red) = 12 / 20 = 3/5 (0.60)\nStep 2: Remaining total = 19 balls; remaining red = 11 balls.\nStep 3: P(Second is Red | First is Red) = 11 / 19.\nStep 4: Combined Probability = (12/20) * (11/19) = 132 / 380 = 33 / 95 ≈ 34.74%.",
    iconName: "BrainCircuit",
    tag: "Analytical Logic"
  },
  {
    id: "summarisation",
    title: "Text Summarisation",
    description: "Condenses dense technical reports, legal transcripts, and long-form literature into crisp executive briefs with zero loss of key entities.",
    examplePrompt: "Summarize the 2017 'Attention Is All You Need' paper in two sentences.",
    exampleOutput: "The paper introduces the Transformer architecture, which dispenses entirely with recurrence and convolutions, relying exclusively on self-attention mechanisms to model global sequence dependencies. This enables massively parallelized training and establishes the modern foundation for high-performance generative language models.",
    iconName: "Sparkles",
    tag: "Information Synthesis"
  },
  {
    id: "translation",
    title: "Language Translation",
    description: "Performs zero-shot and few-shot cross-lingual semantic transfer across 100+ natural and regional languages with idiomatic fluency.",
    examplePrompt: "Translate 'The early bird catches the worm' into French and German idiomatic equivalents.",
    exampleOutput: "• French: 'L'avenir appartient à ceux qui se lèvent tôt' (Literal: 'The future belongs to those who wake early').\n• German: 'Morgenstund hat Gold im Mund' (Literal: 'Morning hour has gold in its mouth'). Both capture the precise idiomatic proverb rather than a robotic word-for-word rendering.",
    iconName: "Languages",
    tag: "Cross-Lingual"
  },
  {
    id: "qa",
    title: "Question Answering",
    description: "Extracts facts, resolves ambiguous inquiries, and synthesizes answers from vast pre-trained corpora or grounding context documents.",
    examplePrompt: "Why does the decoder in GPT use masked self-attention instead of bidirectional attention?",
    exampleOutput: "In autoregressive text generation, the model must predict token t without accessing future tokens t+1, t+2, etc. Masked self-attention applies an upper-triangular mask of -infinity before softmax, ensuring position i can attend only to positions ≤ i, preserving the causal autoregressive constraint.",
    iconName: "HelpCircle",
    tag: "Knowledge Retrieval"
  }
];

export const THREE_PILLARS = [
  {
    id: "generative",
    title: "GENERATIVE",
    subtitle: "Autoregressive Content Synthesis",
    concept: "Creates new content (paragraphs, explanations, code) based on learned patterns via autoregressive prediction.",
    deepDive: "Unlike discriminative models that predict labels P(Y|X), generative models estimate the joint probability distribution P(X) of language sequences. GPT models text generation as sequential probability estimation: token by token, sampling the next most likely continuation conditioned on all prior tokens.",
    formula: "P(x_1, \\dots, x_T) = \\prod_{t=1}^T P(x_t \\mid x_1, \\dots, x_{t-1})",
    technicalMetrics: ["Unsupervised text generation", "Nucleus / Temperature sampling", "Loss: Cross-Entropy of next-token logits"],
    icon: "FileEdit"
  },
  {
    id: "pre-trained",
    title: "PRE-TRAINED",
    subtitle: "Self-Supervised Foundation Scale",
    concept: "Learns language structures, grammar, and contextual relationships from massive datasets prior to specific task adaptation.",
    deepDive: "Pre-training solves the data bottleneck of AI: instead of expensive human-labeled datasets, the raw web itself is the teacher. By predicting the next word across trillions of tokens of books, code, articles, and research papers, the model internalizes syntax, world knowledge, common sense, and reasoning abstractions before fine-tuning.",
    formula: "\\mathcal{L}_{pre}(\\theta) = -\\sum_{i=1}^N \\log P_\\theta(u_i \\mid u_{i-k}, \\dots, u_{i-1})",
    technicalMetrics: ["Trillions of training tokens", "Self-supervised next-token loss", "Cluster scaling (10,000+ GPUs)"],
    icon: "Database"
  },
  {
    id: "transformer",
    title: "TRANSFORMER",
    subtitle: "Attention-Driven Parallel Architecture",
    concept: "Utilizes the 2017 attention-based neural network architecture (Attention Is All You Need) to identify relationships between sequence inputs.",
    deepDive: "Before Transformers, Recurrent Neural Networks (RNNs & LSTMs) processed text sequentially, creating memory bottlenecks and preventing hardware parallelization. The Transformer replaces recurrence with Scaled Dot-Product Self-Attention, computing pairwise affinities between all tokens in O(1) sequential steps on modern tensor accelerators.",
    formula: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V",
    technicalMetrics: ["O(1) path length between tokens", "Massive matrix parallelization", "Multi-head representation subspaces"],
    icon: "Cpu"
  }
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "output-layer",
    level: 5,
    name: "Output Layer & Unembedding Projection",
    shortDesc: "Produces probability scores for predicting the next token across the vocabulary.",
    tensorShape: "[Batch, SequenceLength, VocabSize (~50,257 to 100k+)]",
    mathFormula: "P(w_{t+1}) = \\text{softmax}(W_u \\cdot \\text{RMSNorm}(h_L) / T)",
    fullExplanation: "The final hidden state corresponding to the last input token is normalized and projected through an unembedding matrix W_u back to the dimension of the vocabulary. A Softmax function converts raw logits into a rigorous probability distribution over all known tokens.",
    keyFunctions: [
      "Final layer normalization (RMSNorm / LayerNorm)",
      "Logits generation via linear matrix projection",
      "Temperature scaling and Top-K / Top-P (Nucleus) probability sampling",
      "Argmax selection or stochastic generation loopback"
    ],
    note: "Temperature T modulates entropy: T < 1 sharpens peak probabilities (deterministic), while T > 1 flattens distribution (creative/diverse).",
    color: "from-cyan-500/30 to-blue-600/30 border-cyan-400"
  },
  {
    id: "ffn-layer",
    level: 4,
    name: "Feed-Forward Network (FFN / MLP)",
    shortDesc: "Processes attention representations through non-linear dense projections.",
    tensorShape: "[Batch, SequenceLength, 4 × d_model]",
    mathFormula: "\\text{FFN}(x) = \\max(0, x W_1 + b_1) W_2 + b_2 \\quad \\text{or SwiGLU: } (x W_{gate} \\cdot \\text{Swish}(x W_1)) W_2",
    fullExplanation: "While self-attention routes information across different tokens, the Feed-Forward Network operates on each token position independently. It projects the representation into a higher-dimensional intermediate space (typically 4x d_model), applies non-linear activations (GELU or SwiGLU), and projects back.",
    keyFunctions: [
      "Token-wise non-linear feature transformation",
      "Acts as a key-value associative memory of factual knowledge",
      "High-dimensional expansion (e.g., 4,096 -> 14,336 -> 4,096 in modern 70B models)",
      "Residual connection and normalization wrapping"
    ],
    note: "Researchers consider the FFN layers to store the bulk of the model's factual 'world memory' acquired during pre-training.",
    color: "from-blue-600/30 to-indigo-600/30 border-blue-400"
  },
  {
    id: "masked-attention",
    level: 3,
    name: "Masked Multi-Head Self-Attention",
    shortDesc: "Identifies contextual relationships while preventing the model from looking at future tokens.",
    tensorShape: "[Batch, NumHeads, SequenceLength, d_k]",
    mathFormula: "\\text{MaskedAttention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)V, \\quad M_{ij} = \\begin{cases} 0 & i \\ge j \\\\ -\\infty & i < j \\end{cases}",
    fullExplanation: "The heart of the decoder-only transformer. Each token creates Query (Q), Key (K), and Value (V) vectors. Q and K dot products compute the contextual relevance score between tokens. The critical causal mask M sets all future positions to -infinity, guaranteeing that token t can only attend to past and present tokens (t' <= t).",
    keyFunctions: [
      "Dynamic contextualization of ambiguous words (e.g., 'bank' of a river vs 'bank' for money)",
      "Upper triangular causal masking enforces strict autoregressive time-ordering",
      "Multi-head splitting allows simultaneous attention to grammar, entities, and syntax",
      "KV Caching optimization accelerates inference by storing past keys and values"
    ],
    note: "*Note from presentation: 'Masked' is strictly required to prevent information leakage from future tokens during training and generation.",
    color: "from-cyan-400/40 to-teal-500/30 border-cyan-300"
  },
  {
    id: "embeddings-positional",
    level: 2,
    name: "Token Embeddings + Positional Info",
    shortDesc: "Converts discrete tokens to continuous numerical vectors and injects sequence order.",
    tensorShape: "[Batch, SequenceLength, d_model (e.g. 768, 4096, 12288)]",
    mathFormula: "X_0 = W_e(Tokens) + W_p(Positions) \\quad \\text{or Rotary Embeddings (RoPE)}",
    fullExplanation: "Discrete token integers cannot be multiplied by weights. An embedding lookup table maps each token ID to a continuous dense vector in d_model dimensional space. Because attention is permutation-invariant, positional encoding (learned, sinusoidal, or modern Rotary Position Embedding / RoPE) is added or applied to encode token order.",
    keyFunctions: [
      "Dense representation mapping semantics into high-dimensional geometric space",
      "Encoding linear syntactic distance and sequential ordering",
      "Initial semantic initialization before entering multi-layer transformer blocks",
      "Supports vocabulary sizes typically between 32,000 and 128,000 tokens"
    ],
    note: "Without positional information, the model would perceive 'cat ate fish' and 'fish ate cat' as mathematically identical sequences.",
    color: "from-indigo-600/30 to-purple-600/30 border-indigo-400"
  },
  {
    id: "input-tokens",
    level: 1,
    name: "Input Tokens (Raw Sequence Data)",
    shortDesc: "Raw text input converted into numerical token sequences by the tokenizer.",
    tensorShape: "[Batch, SequenceLength]",
    mathFormula: "T = [t_1, t_2, \\dots, t_N] \\in \\mathbb{Z}^{N}",
    fullExplanation: "The raw text entered by human users is ingested and parsed by a Byte-Pair Encoding (BPE) or WordPiece tokenizer. Common words are assigned single token IDs, while rare or compound words are decomposed into subword chunks, punctuation, or individual bytes.",
    keyFunctions: [
      "Subword chunking via Byte-Pair Encoding (BPE)",
      "Handling out-of-vocabulary terms by falling back to UTF-8 byte representations",
      "Prepending and appending special sequence boundaries (<|endoftext|>)",
      "Input validation and truncation to fit within the model context window"
    ],
    note: "Example: The prompt 'GPT generates text.' is converted into 4 distinct tokens: ['GPT', ' generates', ' text', '.'].",
    color: "from-slate-700/40 to-slate-800/40 border-slate-500"
  }
];

export const TECHNICAL_COMPONENTS: TechnicalComponent[] = [
  {
    id: "token",
    name: "Token",
    symbol: "□",
    definition: "A basic unit of text processed by the model.",
    extendedExplanation: "Tokens are the fundamental atomic currency of LLMs. A token can be a single character, a subword fragment, a complete word, or punctuation. In standard English corpora, 1 token averages roughly 4 characters or 0.75 words.",
    analogousConcept: "Like syllables or morphemes in linguistics, or atomic building blocks of sentences.",
    example: "Input: 'unbelievable' -> Tokens: ['un', 'believ', 'able'] (3 tokens).",
    icon: "Square"
  },
  {
    id: "embedding",
    name: "Embedding",
    symbol: "○",
    definition: "A numerical vector representation of linguistic information.",
    extendedExplanation: "Embeddings map discrete symbolic tokens into high-dimensional vector space (e.g., 4,096 dimensions). Tokens with similar semantic meanings, roles, or contexts reside close to each other in this geometric manifold.",
    analogousConcept: "GPS coordinates on an infinite semantic map where 'king' - 'man' + 'woman' ≈ 'queen'.",
    example: "Vector for 'cat': [0.124, -0.841, 0.493, ..., 0.052] (1536 floats).",
    icon: "Circle"
  },
  {
    id: "parameter",
    name: "Parameter",
    symbol: "△",
    definition: "Learned numerical values determining how input is processed.",
    extendedExplanation: "Parameters are the weights and biases of the neural network optimized during training. When we say GPT-3 has 175 billion parameters, it means there are 175 billion floating-point numbers modified by gradient descent to encode knowledge.",
    analogousConcept: "Tuning knobs on a massive 175-billion-dial radio that adjusts until the reception is crystal clear.",
    example: "W_q, W_k, W_v weight matrices in every attention head across 96 transformer layers.",
    icon: "Triangle"
  },
  {
    id: "context-window",
    name: "Context Window",
    symbol: "⚙",
    definition: "Maximum input/conversation length the model can retain.",
    extendedExplanation: "The total token budget (prompt + generation history) that can be processed concurrently in a single forward pass. Constrained by the quadratic O(N²) memory complexity of self-attention, though modern techniques (FlashAttention, RoPE scaling) have expanded this to 128k - 1M+ tokens.",
    analogousConcept: "The active working memory or whiteboard size of the AI assistant.",
    example: "GPT-1: 512 tokens | GPT-3: 2,048 tokens | GPT-4: 32k-128k tokens | Modern frontier: 1M+ tokens.",
    icon: "Maximize2"
  },
  {
    id: "attention",
    name: "Attention",
    symbol: "🧠",
    definition: "Mechanism calculating relevance between different context parts.",
    extendedExplanation: "Attention allows every token in the sequence to dynamically look at every other prior token and calculate how much relevance it holds. This lets pronouns bind to their antecedents and verbs coordinate with distant subjects.",
    analogousConcept: "A spotlight in an orchestra focusing on the violin section right when the conductor signals.",
    example: "In 'The animal didn't cross the street because it was too tired', attention binds 'it' strongly to 'animal', not 'street'.",
    icon: "Eye"
  },
  {
    id: "inference",
    name: "Inference",
    symbol: "⇥",
    definition: "Using the trained model to generate predictions.",
    extendedExplanation: "The production execution phase where a frozen model processes user input and generates outputs without updating its weights. Inference involves running the forward pass, computing logits, and sampling tokens autoregressively.",
    analogousConcept: "A student taking an exam after graduation; no more studying (weight updates), just applying learned knowledge.",
    example: "Sending a prompt to the OpenAI API and receiving streamed token completions in real time.",
    icon: "ArrowRightCircle"
  },
  {
    id: "fine-tuning",
    name: "Fine-tuning",
    symbol: "🎯",
    definition: "Secondary training on specific datasets for particular tasks.",
    extendedExplanation: "Taking a general pre-trained foundation model and continuing gradient descent on a smaller, curated domain-specific dataset (such as medical diagnosis, SQL generation, or legal contracts) or with LoRA (Low-Rank Adaptation).",
    analogousConcept: "A general medical doctor completing a residency to become a specialized neurosurgeon.",
    example: "Training GPT-3 on pairs of Python documentation and code to create Codex.",
    icon: "Target"
  },
  {
    id: "tokenization",
    name: "Tokenization",
    symbol: "✂",
    definition: "Dividing text into processable tokens.",
    extendedExplanation: "The algorithmic pipeline that converts raw Unicode strings into integer token sequences using statistical compression algorithms like Byte-Pair Encoding (BPE). It balances vocabulary size against sequence length.",
    analogousConcept: "Translating spoken language into Morse code dots and dashes before sending across a wire.",
    example: "Input String: 'GPT generates text.' -> Output Tokens: [GPT] [generates] [text] [.]",
    icon: "Scissors"
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: "2018",
    model: "GPT-1",
    parameters: "117 Million",
    contextWindow: "512 tokens",
    headline: "Introduced Generative Pre-training",
    description: "OpenAI proved that an unsupervised pre-trained decoder-only transformer could transfer rich general linguistic knowledge to diverse downstream NLP tasks with minimal fine-tuning.",
    breakthrough: "Decoupled pre-training from task-specific architectures; replaced task-specific models with one foundation.",
    paperRef: "Radford et al., 'Improving Language Understanding by Generative Pre-Training'"
  },
  {
    year: "2019",
    model: "GPT-2",
    parameters: "1.5 Billion",
    contextWindow: "1,024 tokens",
    headline: "Improved Coherent, Longer Text Scale",
    description: "Trained on WebText (40GB of high-karma Reddit outgoing links). Demonstrated zero-shot task transfer without explicit supervision, generating syntactically flawless multi-paragraph essays.",
    breakthrough: "Zero-shot task learning; initially withheld from release due to unprecedented text generation coherence.",
    paperRef: "Radford et al., 'Language Models are Unsupervised Multitask Learners'"
  },
  {
    year: "2020",
    model: "GPT-3",
    parameters: "175 Billion",
    contextWindow: "2,048 tokens",
    headline: "Large-Scale Few-Shot Learning",
    description: "A colossal 100x parameter scale leap. GPT-3 established the 'in-context learning' paradigm: users could give 2-3 examples in the prompt and the model would learn the pattern on the fly without gradient updates.",
    breakthrough: "Emergent capabilities in few-shot prompting, code translation, arithmetic, and creative synthesis.",
    paperRef: "Brown et al., 'Language Models are Few-Shot Learners'"
  },
  {
    year: "2022",
    model: "GPT-3.5 / ChatGPT",
    parameters: "Undisclosed (~175B)",
    contextWindow: "4,096 tokens",
    headline: "Conversational Capabilities & RLHF",
    description: "Introduced InstructGPT and ChatGPT. Leveraged Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT) to transform unpredictable text completers into helpful, safe chat agents.",
    breakthrough: "Alignment breakthrough: made AI intuitive and conversational for millions of non-technical users worldwide.",
    paperRef: "Ouyang et al., 'Training language models to follow instructions with human feedback'"
  },
  {
    year: "2023",
    model: "GPT-4",
    parameters: "~1.8 Trillion (MoE)",
    contextWindow: "32,768 - 128,000 tokens",
    headline: "Improved Reasoning & Multimodality",
    description: "Achieved human 90th percentile scores on the Uniform Bar Exam, USABO, and GRE. Handled image inputs, complex multi-step reasoning, advanced mathematical deductions, and nuanced system prompts.",
    breakthrough: "Mixture-of-Experts (MoE) architecture scaling, multi-modal vision perception, and professional-grade exam mastery.",
    paperRef: "OpenAI, 'GPT-4 Technical Report'"
  },
  {
    year: "2024",
    model: "GPT-4o ('Omni')",
    parameters: "Native Multimodal Architecture",
    contextWindow: "128,000 tokens",
    headline: "Real-time Multimodal (Text / Image / Audio)",
    description: "Native end-to-end multimodal neural network processing audio, vision, and text simultaneously with human-speed response latencies (~230ms, matching human conversational pacing).",
    breakthrough: "Eliminated intermediate speech-to-text pipeline; natively perceives tone, pauses, emotion, and background noise.",
    paperRef: "OpenAI, 'Hello GPT-4o'"
  },
  {
    year: "2025/26",
    model: "Frontier Reasoning / o-Series",
    parameters: "Adaptive Test-Time Compute",
    contextWindow: "200,000+ tokens",
    headline: "Advanced Reasoning & General-Purpose Scale",
    description: "Paradigms shift from pre-training compute to inference test-time compute. Models generate internal hidden chain-of-thought tokens, explore search trees, self-correct errors, and rival PhD-level benchmarks.",
    breakthrough: "System 2 thinking; test-time search algorithms (Monte Carlo tree search, self-consistency) for science and math.",
    paperRef: "OpenAI o1 / o3 Research System Releases"
  }
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "User Input",
    techLabel: "PROMPT_ACQUISITION",
    summary: "User inputs natural text string: \"Artificial Intelligence is\"",
    details: "The user submits a raw Unicode prompt via an API or interface. The prompt may include system instructions, user context, and historical conversation turns.",
    tensorState: "Raw String: 'Artificial Intelligence is'",
    color: "cyan"
  },
  {
    step: 2,
    title: "Tokenisation",
    techLabel: "BPE_ENCODING",
    summary: "Converts text string into discrete numerical token IDs.",
    details: "Byte-Pair Encoding dictionary decomposes the phrase into tokens: ['Artificial', ' Intelligence', ' is']. These map directly to vocabulary index integers: [19478, 12754, 318].",
    tensorState: "Integer Tensor: [19478, 12754, 318]",
    color: "blue"
  },
  {
    step: 3,
    title: "Embedding",
    techLabel: "VECTOR_PROJECTION",
    summary: "Maps discrete integers to continuous dense vectors + position encoding.",
    details: "Each token index fetches a d_model dimensional vector from embedding matrix W_e. Sinusoidal or RoPE rotary positional information is added to encode sequential token order.",
    tensorState: "Float32 Tensor: [1, 3, 4096]",
    color: "indigo"
  },
  {
    step: 4,
    title: "Transformer Processing",
    techLabel: "DEEP_ATTENTION_BLOCKS",
    summary: "Deep stacked layers of Masked Self-Attention and Feed-Forward Networks.",
    details: "Through N layers (e.g., 32 to 96 layers), attention heads calculate dynamic token relationships while causal masks block future information. Representations accumulate rich contextual semantics.",
    tensorState: "Hidden States: H_L ∈ ℝ^[1, 3, 4096]",
    color: "violet"
  },
  {
    step: 5,
    title: "Next-Token Prediction",
    techLabel: "LOGITS_AND_SOFTMAX",
    summary: "Outputs normalized probability scores for every word in vocabulary.",
    details: "Final layer hidden state is projected to vocabulary dimension. Softmax generates candidate probabilities: 'transforming' (60%), 'changing' (30%), 'developing' (10%).",
    tensorState: "Distribution: P(w_{t+1} | w_{1:t})",
    color: "emerald"
  },
  {
    step: 6,
    title: "Sequential Generation",
    techLabel: "AUTOREGRESSIVE_LOOP",
    summary: "Selects candidate token, appends to sequence, and loops back.",
    details: "Using sampling strategies (Greedy, Top-P Nucleus, or Temperature), the model picks 'transforming'. This new token is concatenated to the context, and the pipeline re-runs to predict the next word.",
    tensorState: "New Context: 'Artificial Intelligence is transforming'",
    color: "amber"
  },
  {
    step: 7,
    title: "Final Output",
    techLabel: "DETOKENISATION_STREAM",
    summary: "Sequence continues until <|endoftext|> is generated and streamed to user.",
    details: "Token IDs are translated back into UTF-8 characters via the reverse tokenizer and rendered smoothly onto the screen in real-time.",
    tensorState: "Full Generated Output Stream",
    color: "cyan"
  }
];

export const TRAINING_PIPELINE: PipelineStage[] = [
  {
    id: "pre-training",
    stepNumber: 1,
    title: "Pre-training",
    subtitle: "Self-Supervised Next-Token Learning at Web Scale",
    summary: "The model is exposed to massive datasets to learn general language patterns via next-token prediction.",
    detailedProcess: "The foundational phase where 98%+ of total compute is spent. The model consumes petabytes of web text, books, articles, encyclopedia entries, and code repositories. In an unsupervised self-supervised regime, it repeatedly predicts the next word, discovering grammar, factual relationships, programming idioms, world history, and causal reasoning from the structure of language itself.",
    dataSources: "Common Crawl, Wikipedia, GitHub, ArXiv, BooksCorpus, curated high-quality web scrapes (5 to 15+ trillion tokens).",
    trainingObjective: "Minimizing cross-entropy loss over next token predictions: $\\mathcal{L} = -\\sum_{t=1}^T \\log P(w_t \\mid w_{<t})$.",
    costScale: "Tens of millions of dollars; 10,000+ GPUs clustered with InfiniBand networking running for months.",
    icon: "Database"
  },
  {
    id: "sft",
    stepNumber: 2,
    title: "Supervised Fine-Tuning (SFT)",
    subtitle: "Instruction-Following & Response Formatting",
    summary: "The model is trained on curated Q&A pairs to learn instruction-following and improve response quality.",
    detailedProcess: "Pre-trained models are raw document continuers; if given 'What is the capital of France?', they might respond with 'What is the capital of Spain?' (continuing a quiz) instead of answering. SFT feeds the model tens of thousands of high-quality human-written prompt-and-response demonstrations, teaching it the persona of a helpful, obedient conversational assistant.",
    dataSources: "Curated dialogue transcripts, coding tutorials, synthetic multi-turn prompts generated by verified expert annotators.",
    trainingObjective: "Supervised cross-entropy loss conditioned on explicit instruction templates.",
    costScale: "Moderate compute ($100k-$500k), high human curation expense for expert labeling.",
    icon: "GraduationCap"
  },
  {
    id: "preference-opt",
    stepNumber: 3,
    title: "Preference Optimisation",
    subtitle: "Behavior Alignment via RLHF & DPO",
    summary: "Behavior alignment using human feedback (e.g., RLHF - Reinforcement Learning from Human Feedback) to ensure usefulness and safety.",
    detailedProcess: "Human evaluators rank multiple model completions from best to worst based on helpfulness, harmlessness, and honesty. In classical RLHF, a Reward Model is trained to mimic human taste, and the base model is updated via Proximal Policy Optimization (PPO). Modern pipelines also utilize Direct Preference Optimization (DPO) to align weights directly without a separate reward model.",
    dataSources: "Thousands of pairwise comparisons (Prompt, Chosen Completion, Rejected Completion) graded for truthfulness and refusal of dangerous tasks.",
    trainingObjective: "Maximizing reward score while penalizing divergence (KL-penalty) from the reference SFT model.",
    costScale: "Iterative reinforcement learning cycles requiring careful hyperparameter stability.",
    icon: "ThumbsUp"
  },
  {
    id: "evaluation",
    stepNumber: 4,
    title: "Evaluation & Red Teaming",
    subtitle: "Rigorous Safety Testing, Benchmarking & Vulnerability Audits",
    summary: "Rigorous testing for reasoning accuracy, safety, and identification of model weaknesses.",
    detailedProcess: "Before public deployment, the model undergoes extensive automated and human stress testing. Red-teamers probe for jailbreaks, prompt injection, biosecurity risks, cybersecurity exploits, copyright infringement, and demographic biases. Benchmark suites (MMLU, GSM8K, HumanEval, SWE-bench) establish official capabilities.",
    dataSources: "Standardized evaluation benchmarks, adversarial jailbreak prompt suites, safety refusal datasets.",
    trainingObjective: "Zero tolerance for catastrophic misuse, maximizing accuracy on verifiable benchmarks.",
    costScale: "Continuous human red-teaming and automated evaluation harness runs.",
    icon: "ShieldAlert"
  }
];

export const APPLICATION_DOMAINS: ApplicationDomain[] = [
  {
    id: "software-dev",
    name: "Software Development",
    summary: "Accelerating the engineering lifecycle via real-time code generation, intelligent refactoring, automated unit test authoring, and root-cause bug diagnostics.",
    useCases: ["Algorithmic boilerplate generation", "Legacy code migration (e.g. COBOL to Python)", "Writing comprehensive pytest/Jest suites", "Explaining complex regex and SQL queries"],
    prompt: "Write a Python program to calculate the average of five numbers.",
    codeOutput: `# Corrected from PPT slide 9 typography
def calc_average(nums: list[float]) -> float:
    """Calculate the arithmetic mean of a collection of numbers."""
    if not nums:
        raise ValueError("Cannot calculate average of an empty list.")
    return sum(nums) / len(nums)

# Execution test
sample_data = [10, 20, 30, 40, 50]
result = calc_average(sample_data)
print(f"Sample: {sample_data}")
print(f"Calculated Mean: {result}")
# Output: Calculated Mean: 30.0`,
    language: "python",
    impactMetrics: "Up to 55% faster task completion for developers using AI code assistants (GitHub Octoverse study)."
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    summary: "Summarising complex patient EHR records, de-jargoning medical reports for patients, accelerating clinical trial matching, and synthesizing biochemical literature.",
    useCases: ["Clinical documentation drafting", "Deciphering dense pathology summaries", "Extracting ICD-10 billing codes from doctor notes", "Assisting medical research literature synthesis"],
    prompt: "Summarize a 12-page discharge summary into a 3-bullet patient-friendly checklist for post-operative cardiac care.",
    codeOutput: `// Clinical Summary Engine
1. Medications: Take prescribed beta-blocker (Metoprolol 25mg) daily at 8:00 AM with water; do not skip doses.
2. Incision Care: Keep sternal wound clean and dry; notify clinic immediately if redness or temperature exceeds 100.4°F (38°C).
3. Activity Limits: Do not lift objects heavier than 10 lbs (4.5 kg) for the next 6 weeks to ensure optimal bone healing.`,
    language: "markdown",
    impactMetrics: "Reduces clinical administrative documentation burden from 2 hours/day to under 30 minutes."
  },
  {
    id: "education",
    name: "Education & Pedagogy",
    summary: "Delivering 1-on-1 personalized Socratic tutoring, generating adaptive practice curricula, explaining complex physics concepts at any grade level, and assessing student essays.",
    useCases: ["Custom interactive flashcards and problem sets", "Socratic dialogue coaching without giving away answers", "Translating mathematical concepts into visual analogies", "Language acquisition conversational partner"],
    prompt: "Explain Quantum Superposition to a 10-year-old using a coin flip analogy.",
    codeOutput: `Imagine you flip a coin into the air!
While it's spinning in your hand, is it Heads? Or is it Tails?
It's actually BOTH at the same time until you catch it and slap it down on the table!
In quantum physics, microscopic particles like electrons act like that spinning coin—they can be in multiple states simultaneously until we make a measurement!`,
    language: "markdown",
    impactMetrics: "Enables Bloom's 2-Sigma tutoring benefit (individualized instruction) at global scale."
  },
  {
    id: "banking",
    name: "Banking & Finance",
    summary: "Automating structured document parsing (10-K filings, invoices, KYC scans), synthesizing financial analyst notes, fraud anomaly narration, and customer support escalation.",
    useCases: ["Earnings call transcript Q&A", "Regulatory compliance document audits", "Automated contract clause extraction", "Synthetic financial scenario stress testing"],
    prompt: "Extract quarterly EBIT margin and calculate Year-over-Year growth from two quarterly revenue tables.",
    codeOutput: `// Financial Computation Pipeline
Quarter 1 (2025): Revenue = $4.2B | Operating Income = $840M -> Margin: 20.0%
Quarter 1 (2026): Revenue = $5.1B | Operating Income = $1,173M -> Margin: 23.0%
--------------------------------------------------------------------------
Year-over-Year EBIT Margin Expansion: +300 basis points (+3.0 percentage points)
Operating Income Growth: ((1173 - 840) / 840) * 100 = +39.64% YoY`,
    language: "markdown",
    impactMetrics: "Cuts routine quarterly audit review times from days to minutes while standardizing reporting formulas."
  },
  {
    id: "business",
    name: "Business Operations",
    summary: "Synthesizing cross-functional meeting recordings, drafting high-stakes client correspondence, automating CRM updates, and producing comprehensive competitive intelligence decks.",
    useCases: ["Action-item extraction from video transcripts", "Automated customer email replies with sentiment awareness", "Drafting RFP proposals matching vendor specifications", "Synthesizing market trend competitor dossiers"],
    prompt: "Draft a polite negotiation email responding to a vendor proposing a 15% rate increase.",
    codeOutput: `Subject: Re: FY27 Service Agreement & Proposed Rate Adjustment

Dear [Vendor Partner],

Thank you for providing the updated terms. We value the reliability and collaborative relationship we have built over the past three years.

While we understand macroeconomic cost pressures, a 15% increase exceeds our allocated budget parameters. Given our increased contract volume this year, we propose a 5% adjustment tied to concrete SLA improvements, or alternatively extending the contract term to 24 months at the current rate.

Let's schedule a brief 15-minute call this Thursday to finalize an equitable path forward.

Best regards,
[Operations Leadership]`,
    language: "markdown",
    impactMetrics: "Accelerates outbound proposal response velocity by 3x across global enterprise teams."
  },
  {
    id: "research",
    name: "Scientific Research",
    summary: "Conducting systematic cross-disciplinary literature reviews, hypothesis brainstorming, extracting biochemical properties from PDFs, and drafting LaTeX research papers.",
    useCases: ["Surveying 1,000+ papers for common methodologies", "Translating natural language into PyTorch training scripts", "Formatting equations and citations to specific journal guidelines", "Identifying contradictory conclusions across clinical studies"],
    prompt: "Compare the trade-offs of RoPE (Rotary Position Embeddings) versus ALiBi in long-context Transformers.",
    codeOutput: `\\begin{table}[h]
\\centering
\\begin{tabular}{|l|p{6cm}|p{6cm}|}
\\hline
\\textbf{Feature} & \\textbf{RoPE (Rotary Embeddings)} & \\textbf{ALiBi (Linear Biases)} \\\\
\\hline
Implementation & Multiplies Q and K by rotation matrix & Adds static linear penalty proportional to $|i - j|$ \\\\
Extrapolation & Requires scaling (NTK-aware, YaRN) & Strong zero-shot out-of-distribution extrapolation \\\\
Attention Cache & Retains standard key/value vector structure & Minimal runtime overhead; no vector rotations \\\\
\\hline
\\end{tabular}
\\caption{Comparative Architectural Analysis: RoPE vs. ALiBi}
\\end{table}`,
    language: "latex",
    impactMetrics: "Reduces initial literature survey time for researchers by an estimated 60-70%."
  }
];

export const CORE_STRENGTHS = [
  {
    id: "natural-lang",
    title: "Natural Language Interaction",
    subtitle: "Replaces strict programming commands",
    description: "Enables humans to command software and extract answers using colloquial, intuitive natural language instead of rigid command-line syntax or arcane query languages.",
    metric: "Zero Syntax Learning Curve",
    icon: "MessageSquare"
  },
  {
    id: "productivity",
    title: "Productivity Multiplier",
    subtitle: "Reduces repetitive manual processing",
    description: "Automates boilerplate drafting, documentation creation, data reformatting, and rote information extraction, freeing humans for high-level creative synthesis.",
    metric: "30% - 50% Time Saved on Rote Tasks",
    icon: "Zap"
  },
  {
    id: "multilingual",
    title: "Multilingual Support",
    subtitle: "Translates and understands globally",
    description: "Trained on hundreds of languages natively, seamlessly crossing linguistic barriers, regional dialects, and cultural idioms without dedicated language parsers.",
    metric: "100+ Global Languages Supported",
    icon: "Globe"
  },
  {
    id: "content-gen",
    title: "Fast Content Generation",
    subtitle: "Rapid drafting and synthesis",
    description: "Generates thousands of words of structured prose, code, or documentation in seconds, serving as an instant brainstorming collaborator.",
    metric: "50-150 Tokens Generated per Second",
    icon: "Flame"
  },
  {
    id: "analytical-reasoning",
    title: "Analytical Reasoning",
    subtitle: "Processes complex logic & multi-step problems",
    description: "Breaks intricate math, software bugs, and logic puzzles into step-by-step causal deductions through chain-of-thought processing.",
    metric: "90th+ Percentile on Standardized Exams",
    icon: "Scale"
  },
  {
    id: "adaptability",
    title: "High Adaptability",
    subtitle: "One unified model handles diverse tasks",
    description: "Unlike narrow AI models trained for a single purpose (e.g. only chess or only sentiment analysis), a single GPT foundation handles code, medicine, creative writing, and legal briefs.",
    metric: "General-Purpose Foundation Utility",
    icon: "Layers"
  }
];

export const LIMITATIONS_AND_CHALLENGES = [
  {
    id: "bias",
    title: "Bias",
    icon: "AlertTriangle",
    summary: "Reproduces biases found in training data.",
    deepDive: "Because the model is trained on historical internet data, it inevitably absorbs cultural prejudices, demographic stereotypes, and historical skews present in human literature. Mitigation requires deliberate dataset curation and debiasing alignment."
  },
  {
    id: "privacy",
    title: "Privacy Risks",
    icon: "Lock",
    summary: "Sensitive data requires careful handling.",
    deepDive: "If confidential enterprise secrets, personal healthcare records, or private user passwords exist in training sets, models can potentially memorize and leak them. Modern enterprise deployments use zero-data-retention APIs and differential privacy."
  },
  {
    id: "context-limits",
    title: "Context Limitations",
    icon: "Minimize",
    summary: "Bound by a finite token context window.",
    deepDive: "The mathematical complexity of standard self-attention scales quadratically $O(N^2)$ with sequence length $N$. Even with expanded 128k windows, models suffer from the 'lost in the middle' phenomenon where details in the middle of long prompts are recalled less reliably."
  },
  {
    id: "knowledge-cutoff",
    title: "Knowledge Cutoff",
    icon: "Calendar",
    summary: "Lacks real-time info without external tools.",
    deepDive: "A model's weights are static once training completes. It has zero knowledge of events occurring after its training cutoff date unless augmented with web search tools, vector databases, or Retrieval-Augmented Generation (RAG)."
  },
  {
    id: "compute-cost",
    title: "Computational Cost",
    icon: "BatteryCharging",
    summary: "Massive resource requirements for training & inference.",
    deepDive: "Frontier training runs consume megawatts of electricity and thousands of water-cooled GPUs running continuous matrix operations for months. High inference latency and GPU memory bandwidth also pose real-world economic constraints."
  }
];

export const HALLUCINATION_PROBLEM = {
  title: "The Hallucination Problem",
  highlightQuote: "Occurs when an AI generates information that appears credible but is entirely fabricated, unsupported, or false (e.g., inventing nonexistent citations).",
  rootCause: "GPT is fundamentally an autoregressive token predictor trained to maximize likelihood, not an epistemological truth verifier. It optimizes for linguistic plausibility rather than factual ground truth.",
  classicExamples: [
    "Inventing realistic-sounding legal case citations with fabricated docket numbers and judges.",
    "Making up non-existent DOI numbers, author lists, or academic paper titles.",
    "Confident mathematical errors hidden behind beautifully formatted explanations."
  ],
  modernMitigations: [
    "Retrieval-Augmented Generation (RAG): Grounding responses in verified external documents.",
    "Tool Use & Code Interpreters: Offloading arithmetic and fact lookup to deterministic python runtimes.",
    "Chain-of-Verification (CoVe): Having the model draft, query its own assertions, and revise for truth.",
    "Reinforcement Learning with Verifiable Rewards (RLVR): Rewarding exact answers in formal math/code."
  ]
};

export const PARADIGM_SHIFT: ComparisonDimension[] = [
  {
    dimension: "Core Mechanism",
    traditionalSearch: {
      title: "Retrieval-based",
      description: "Crawls web pages, builds reverse keyword indices, and computes ranking scores (e.g. PageRank, BM25) over pre-existing documents.",
      pros: "Exact citations, index of existing human web pages"
    },
    gptArchitecture: {
      title: "Generation-based",
      description: "Projects user prompts through billions of neural weights to predict subsequent token probabilities and synthesize novel textual answers.",
      pros: "Synthesizes tailored solutions, reasons across disparate domains"
    }
  },
  {
    dimension: "Output Type",
    traditionalSearch: {
      title: "List of Hyperlinks & Snippets",
      description: "Returns a ranked 10-blue-links search engine results page (SERP) pointing the user to external source URLs.",
      pros: "User visits original source to verify credibility"
    },
    gptArchitecture: {
      title: "Synthesized Direct Answer",
      description: "Directly crafts an integrated explanation, structured code snippet, formatted table, or customized draft in real time.",
      pros: "Zero click friction; aggregates insights from multiple sources"
    }
  },
  {
    dimension: "Best For",
    traditionalSearch: {
      title: "Locating Sources & Real-Time Facts",
      description: "Finding official documentation, live stock prices, current weather, local business addresses, and primary source verification.",
      pros: "Unbeatable for real-time freshness and source verification"
    },
    gptArchitecture: {
      title: "Drafting, Explaining, Summarizing & Ideation",
      description: "Creative problem-solving, code debugging, complex concept translation, refactoring, and customized brainstorming.",
      pros: "Unbeatable for comprehension, customization, and generative synthesis"
    }
  },
  {
    dimension: "Handling Ambiguity",
    traditionalSearch: {
      title: "Keyword Matching",
      description: "Requires user to refine keywords or Boolean operators if the initial query is poorly phrased.",
      pros: "Predictable, deterministic keyword results"
    },
    gptArchitecture: {
      title: "Contextual Disambiguation",
      description: "Infers user intent, accommodates typos and conversational follow-ups, and asks clarifying questions.",
      pros: "Engages in conversational, iterative problem solving"
    }
  }
];

export const FUTURE_TRAJECTORY: FuturePillar[] = [
  {
    id: "multimodality",
    title: "Advanced Multimodality",
    description: "Native integration of real-time audio, high-frame-rate video, sensor telemetry, and text through unified neural representations.",
    breakthroughTech: "End-to-end omni-modal token streams; real-time conversational vision with zero latency speech turn-taking.",
    timeline: "2024 - 2026",
    realWorldImpact: "Wearable smart glasses providing live visual tutoring, hands-free surgical assistance, and seamless cross-language audio translation."
  },
  {
    id: "improved-reasoning",
    title: "Improved Reasoning & Test-Time Compute",
    description: "Enhanced mathematical logic, formal program verification, and deliberate System-2 thinking via search algorithms.",
    breakthroughTech: "Process-supervised reward models (PRMs), Monte Carlo Tree Search over reasoning chains, and adaptive test-time compute.",
    timeline: "2025 - 2027",
    realWorldImpact: "Autonomous discovery of novel mathematical proofs, automated drug molecule candidate generation, and zero-defect software engineering."
  },
  {
    id: "enhanced-reliability",
    title: "Enhanced Reliability & Verifiability",
    description: "Verifiable outputs, mathematical certainty, and radical reduction in hallucination rates through grounding.",
    breakthroughTech: "Formal methods integration, auto-formalization to Lean/Coq proof assistants, and continuous factuality calibration.",
    timeline: "2025 - 2028",
    realWorldImpact: "Mission-critical deployment in aerospace control, legal litigation, and automated medical diagnosis without liability fears."
  },
  {
    id: "agentic-ai",
    title: "Tool Integration (Agentic AI)",
    description: "Ability to execute multi-step software actions, control web browsers, invoke terminal CLIs, and interact with operating systems autonomously.",
    breakthroughTech: "Function calling schemas, long-horizon planning agents, error recovery loops, and sandboxed execution environments.",
    timeline: "2025 - 2030",
    realWorldImpact: "Full workflow automation: AI agents that receive a project spec, spin up repositories, write tests, debug crashes, and deploy to production."
  }
];

export const KEY_TAKEAWAYS = [
  {
    number: 1,
    title: "Decoder-Only Transformer Foundation",
    summary: "Powered by the decoder-only Transformer architecture using multi-head self-attention and causal masking to model deep language dependencies without recurrence."
  },
  {
    number: 2,
    title: "Autoregressive Next-Token Prediction",
    summary: "Generates text sequentially via next-token probability distribution modeling. Every output token conditions the next step in an iterative generation loop."
  },
  {
    number: 3,
    title: "Complex Multi-Stage Training Pipeline",
    summary: "Achieves capability through massive self-supervised pre-training on trillions of tokens, followed by Supervised Fine-Tuning (SFT) and preference alignment (RLHF / DPO)."
  }
];

export const CORE_PHILOSOPHICAL_AXIOM = "GPT is a powerful intelligent assistance system, but its outputs fundamentally require human verification and professional judgement.";

export const ACADEMIC_REFERENCES: AcademicReference[] = [
  {
    id: "vaswani-2017",
    title: "Attention Is All You Need",
    authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
    year: "2017",
    publication: "Advances in Neural Information Processing Systems (NeurIPS 2017), 30.",
    significance: "The seminal foundational paper introducing the Transformer architecture, multi-head self-attention, and replacing recurrent and convolutional sequence models.",
    url: "https://arxiv.org/abs/1706.03762",
    bibtex: `@inproceedings{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, {\\L}ukasz and Polosukhin, Illia},
  booktitle={Advances in Neural Information Processing Systems},
  volume={30},
  year={2017}
}`
  },
  {
    id: "radford-2019",
    title: "Language Models are Unsupervised Multitask Learners",
    authors: "Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & Sutskever, I.",
    year: "2019",
    publication: "OpenAI Technical Report (GPT-2).",
    significance: "Demonstrated that scaling decoder-only language models enables zero-shot task transfer across diverse NLP benchmarks without explicit task training datasets.",
    url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
    bibtex: `@article{radford2019language,
  title={Language models are unsupervised multitask learners},
  author={Radford, Alec and Wu, Jeffrey and Child, Rewon and Luan, David and Amodei, Dario and Sutskever, Ilya},
  journal={OpenAI blog},
  volume={1},
  number={8},
  pages={9},
  year={2019}
}`
  },
  {
    id: "openai-2023-gpt4",
    title: "GPT-4 Technical Report",
    authors: "OpenAI",
    year: "2023",
    publication: "arXiv preprint arXiv:2303.08774.",
    significance: "Documented the capabilities, limitations, safety evaluations, and benchmark performance of GPT-4 across standardized professional exams and multimodal tasks.",
    url: "https://arxiv.org/abs/2303.08774",
    bibtex: `@article{openai2023gpt4,
  title={GPT-4 Technical Report},
  author={OpenAI},
  journal={arXiv preprint arXiv:2303.08774},
  year={2023}
}`
  },
  {
    id: "huggingface-gpt",
    title: "Hugging Face Transformers: GPT Model Family Documentation",
    authors: "Wolf, T. et al. / Hugging Face Community",
    year: "2020 - Present",
    publication: "Hugging Face Open Source Documentation.",
    significance: "The definitive open-source software implementation and architectural reference for decoder-only transformers, causal attention masks, and tokenizers.",
    url: "https://huggingface.co/docs/transformers/model_doc/gpt2",
    bibtex: `@article{wolf2020transformers,
  title={Transformers: State-of-the-Art Natural Language Processing},
  author={Wolf, Thomas and Debut, Lysandre and Sanh, Victor and Chaumond, Julien and Delangue, Clement and Moi, Anthony and Cistac, Pierric and Rault, Clara and Louf, R{\'e}mi and Funtowicz, Morgan and others},
  journal={EMNLP System Demonstrations},
  year={2020}
}`
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary role of 'Masked Self-Attention' in the GPT decoder architecture?",
    options: [
      "To randomly drop out 50% of the attention weights to prevent overfitting.",
      "To prevent the model from looking at future tokens during autoregressive generation.",
      "To translate text directly into other foreign languages before processing.",
      "To compress the input tokens into lower-precision integers."
    ],
    correctIndex: 1,
    explanation: "In autoregressive language modeling, predicting token t requires that future tokens (t+1, t+2...) are strictly masked out by adding -infinity to the attention matrix before softmax. This prevents information leakage from the future."
  },
  {
    id: 2,
    question: "What is the critical distinction between 'GPT' and 'ChatGPT'?",
    options: [
      "There is no difference; they are identical terms for the exact same software.",
      "GPT is an open-source database, whereas ChatGPT is a closed-source programming language.",
      "GPT is the underlying AI foundation model family, while ChatGPT is the consumer product and chat interface.",
      "ChatGPT runs locally on laptops, while GPT only runs on quantum supercomputers."
    ],
    correctIndex: 2,
    explanation: "As highlighted in Slide 4, GPT refers to the foundational deep learning neural model family (GPT-3, GPT-4, etc.), whereas ChatGPT is the commercial product, user interface, and application layer built upon it."
  },
  {
    id: 3,
    question: "Why does the 'Hallucination Problem' occur in Large Language Models?",
    options: [
      "Because the GPU overheats and drops random memory bits.",
      "Because GPT predicts the most probable next token based on learned patterns rather than checking epistemological truth.",
      "Because user internet connections experience packet loss during transmission.",
      "Because transformers only understand English and fail on all numbers."
    ],
    correctIndex: 1,
    explanation: "GPT models optimize for linguistic statistical likelihood rather than grounded truth verification. When knowledge is missing, the model generates words that sound stylistically plausible and convincing, even if completely fabricated."
  },
  {
    id: 4,
    question: "Which sequence correctly reflects the 4-stage GPT training pipeline?",
    options: [
      "Evaluation → Supervised Fine-Tuning → Pre-training → Preference Optimisation",
      "Pre-training → Supervised Fine-Tuning (SFT) → Preference Optimisation (RLHF) → Evaluation",
      "Prompting → Quantization → Tokenization → Embedding",
      "Fine-Tuning → Pre-training → Deployment → De-tokenization"
    ],
    correctIndex: 1,
    explanation: "The standard modern alignment pipeline begins with massive self-supervised Pre-training, followed by Supervised Fine-Tuning (SFT) for instruction following, Preference Optimisation (RLHF/DPO) for safety/helpfulness, and rigorous Red Teaming/Evaluation."
  },
  {
    id: 5,
    question: "How does the fundamental mechanism of GPT differ from traditional Search Engines?",
    options: [
      "Search engines generate synthetic answers, while GPT looks up cached web links.",
      "Search engines retrieve indexed web documents; GPT synthesizes novel text conditioned on the prompt.",
      "Search engines only work on mobile devices, while GPT works on servers.",
      "They use the exact same algorithm under different branding."
    ],
    correctIndex: 1,
    explanation: "Slide 12 states the core paradigm shift: 'Search engines retrieve the past; GPT synthesizes the prompt.' Search is retrieval-based (indexing & ranking existing documents), while GPT is generation-based (sampling from learned neural representations)."
  },
  {
    id: 6,
    question: "What is an 'Embedding' in the context of transformer architecture?",
    options: [
      "A physical hardware chip soldered onto the motherboard.",
      "A numerical vector representation of linguistic information in high-dimensional space.",
      "The final text answer displayed to the human user.",
      "A software firewall preventing prompt injections."
    ],
    correctIndex: 1,
    explanation: "As defined in Slide 6, an embedding maps discrete token symbols into continuous dense numerical vectors (e.g. 4096 dimensions) where semantic and syntactic relationships can be computed mathematically."
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: "autoregression",
    term: "Autoregressive Generation",
    category: "Architecture",
    definition: "A process where the model predicts the next token conditioned strictly on preceding context tokens, feeding each generated token back into the input sequence for the next step.",
    relatedSlide: "Slides 1, 2, 7, 14",
    example: "Generating 'Artificial' -> appending to prompt -> predicting 'Intelligence' -> appending -> predicting 'is'..."
  },
  {
    id: "bpe",
    term: "Byte-Pair Encoding (BPE)",
    category: "Inference",
    definition: "A subword tokenization algorithm that iteratively merges the most frequently co-occurring pairs of bytes or characters into unified tokens.",
    relatedSlide: "Slide 6, 7",
    example: "Separating 'transformer' into ['transform', 'er'] based on statistical corpus frequency."
  },
  {
    id: "causal-mask",
    term: "Causal Masking",
    category: "Architecture",
    definition: "An upper-triangular matrix of -infinity values applied to attention logits before softmax to prevent attention heads from observing future tokens.",
    relatedSlide: "Slide 5",
    example: "Matrix M where M[i, j] = -∞ for all j > i."
  },
  {
    id: "context-window",
    term: "Context Window",
    category: "Architecture",
    definition: "The maximum number of tokens a model can accept in a single forward pass, including both prompt history and generation output.",
    relatedSlide: "Slide 6, 11",
    example: "128,000 tokens in GPT-4o allows analyzing an entire 300-page book in one prompt."
  },
  {
    id: "decoder-only",
    term: "Decoder-Only Architecture",
    category: "Architecture",
    definition: "A transformer variant that discards the cross-attention encoder stack and uses only masked self-attention blocks for autoregressive generation.",
    relatedSlide: "Slide 5, 14",
    example: "GPT, LLaMA, and Claude are decoder-only; original Vaswani 2017 Transformer was encoder-decoder."
  },
  {
    id: "embedding",
    term: "Embedding",
    category: "Architecture",
    definition: "High-dimensional continuous vector representation of words or tokens that encodes semantic similarities geometrically.",
    relatedSlide: "Slide 6, 7",
    example: "d_model = 4096 dimensions where similar words have high cosine similarity."
  },
  {
    id: "feed-forward",
    term: "Feed-Forward Network (FFN)",
    category: "Architecture",
    definition: "Pointwise multi-layer perceptron following self-attention that acts as associative memory storing pre-trained factual knowledge.",
    relatedSlide: "Slide 5",
    example: "Expands dimension from 4,096 to 14,336 with SwiGLU activation before projecting back."
  },
  {
    id: "hallucination",
    term: "Hallucination",
    category: "Safety",
    definition: "The phenomenon where a generative model outputs text that is grammatically articulate and authoritative, but factually false or fabricated.",
    relatedSlide: "Slide 11",
    example: "Inventing fake legal precedents or nonexistent journal articles with fabricated DOIs."
  },
  {
    id: "in-context-learning",
    term: "In-Context Learning",
    category: "Inference",
    definition: "The ability of large models to understand and execute novel tasks demonstrated in the prompt without updating any model weights.",
    relatedSlide: "Slide 4",
    example: "Providing two example French translations in prompt, and model translates the third accurately."
  },
  {
    id: "logits",
    term: "Logits",
    category: "Inference",
    definition: "The raw, unnormalized floating-point score outputs from the final linear projection layer before Softmax converts them into probabilities.",
    relatedSlide: "Slide 5, 7",
    example: "Raw scores [-2.4, 8.1, 14.5, 0.3] for candidate words in the vocabulary."
  },
  {
    id: "parameter",
    term: "Parameter (Weights & Biases)",
    category: "General",
    definition: "Learned numerical values optimized by backpropagation during training that store the model's representations and capabilities.",
    relatedSlide: "Slide 6",
    example: "175 billion weights in GPT-3 stored as 16-bit floating point numbers (FP16)."
  },
  {
    id: "pre-training",
    term: "Pre-training",
    category: "Training",
    definition: "The computationally heavy first phase of training where a neural model learns general syntax, reasoning, and world knowledge on trillions of text tokens.",
    relatedSlide: "Slide 3, 8",
    example: "Training across 15 trillion tokens on 16,000 GPUs for several months."
  },
  {
    id: "rlhf",
    term: "RLHF (Reinforcement Learning from Human Feedback)",
    category: "Training",
    definition: "Alignment methodology where a reward model trained on human preference ratings guides policy optimization (PPO) to make AI outputs safe and helpful.",
    relatedSlide: "Slide 8",
    example: "Teaching the model to refuse dangerous bomb-making queries while remaining helpful on chemistry questions."
  },
  {
    id: "self-attention",
    term: "Self-Attention",
    category: "Architecture",
    definition: "Mechanism that computes pairwise relevance scores between all token positions in a sequence using Query, Key, and Value projections.",
    relatedSlide: "Slide 3, 5",
    example: "Attention(Q, K, V) = softmax(QK^T / √d_k) * V."
  },
  {
    id: "sft",
    term: "Supervised Fine-Tuning (SFT)",
    category: "Training",
    definition: "Training a pre-trained base model on high-quality question-answer demonstrations so it acts as an obedient assistant rather than a raw text completer.",
    relatedSlide: "Slide 8",
    example: "Training on 50,000 curated user-assistant dialogue pairs."
  },
  {
    id: "temperature",
    term: "Temperature Sampling",
    category: "Inference",
    definition: "A hyperparameter dividing logits prior to softmax; lower values (<1.0) concentrate probabilities on top candidates, while higher values (>1.0) increase diversity.",
    relatedSlide: "Slide 7",
    example: "Temperature 0.0 = greedy argmax (deterministic code); Temperature 0.8 = creative writing."
  },
  {
    id: "token",
    term: "Token",
    category: "Architecture",
    definition: "The fundamental subword chunk processed by language models; roughly equal to 0.75 English words.",
    relatedSlide: "Slide 6, 7",
    example: "'Generative' is 1 token; 'Transformer' is 2 tokens in cl100k_base."
  }
];

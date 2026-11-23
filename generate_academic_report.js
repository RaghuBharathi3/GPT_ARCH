import fs from 'fs';
import path from 'path';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  HeadingLevel, 
  AlignmentType, 
  BorderStyle, 
  WidthType, 
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber
} from 'docx';

const FONT_FAMILY = 'Times New Roman';
const COLOR_BLACK = '000000';
const COLOR_CHARCOAL = '222222';
const COLOR_GREY_LIGHT = 'F2F2F2';
const COLOR_GREY_BORDER = 'CCCCCC';
const COLOR_GREY_DARK = '555555';

// Helper functions for formal academic styling
function pBody(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 0, after: 100, line: 276 }, // 1.15 line spacing
    children: [
      new TextRun({
        text: text,
        font: FONT_FAMILY,
        size: 22, // 11pt
        color: COLOR_BLACK
      })
    ]
  });
}

function pBullet(boldPrefix, text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    bullet: { level: 0 },
    spacing: { before: 0, after: 60, line: 276 },
    children: [
      new TextRun({
        text: boldPrefix + ' ',
        bold: true,
        font: FONT_FAMILY,
        size: 22,
        color: COLOR_BLACK
      }),
      new TextRun({
        text: text,
        font: FONT_FAMILY,
        size: 22,
        color: COLOR_BLACK
      })
    ]
  });
}

function h1(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text: `${num}. ${text.toUpperCase()}`,
        bold: true,
        font: FONT_FAMILY,
        size: 26, // 13pt
        color: COLOR_BLACK
      })
    ]
  });
}

function h2(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: `${num} ${text}`,
        bold: true,
        font: FONT_FAMILY,
        size: 23, // 11.5pt
        color: COLOR_BLACK
      })
    ]
  });
}

function h3(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 140, after: 60 },
    children: [
      new TextRun({
        text: `${num} ${text}`,
        bold: true,
        italics: true,
        font: FONT_FAMILY,
        size: 22, // 11pt
        color: COLOR_CHARCOAL
      })
    ]
  });
}

function equation(formulaText, eqNumber) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 140, after: 140 },
    children: [
      new TextRun({
        text: formulaText,
        italics: true,
        font: FONT_FAMILY,
        size: 22,
        color: COLOR_BLACK
      }),
      new TextRun({
        text: `\t\t\t\t(${eqNumber})`,
        font: FONT_FAMILY,
        size: 22,
        color: COLOR_GREY_DARK
      })
    ]
  });
}

function caption(label, title) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 140 },
    children: [
      new TextRun({
        text: `${label}: `,
        bold: true,
        font: FONT_FAMILY,
        size: 20, // 10pt
        color: COLOR_BLACK
      }),
      new TextRun({
        text: title,
        italics: true,
        font: FONT_FAMILY,
        size: 20,
        color: COLOR_CHARCOAL
      })
    ]
  });
}

function academicTable(headers, rowsData, colWidths = []) {
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      shading: { fill: 'EAEAEA', type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BLACK },
        bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BLACK },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE }
      },
      width: colWidths[i] ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: h,
              bold: true,
              font: FONT_FAMILY,
              size: 20, // 10pt
              color: COLOR_BLACK
            })
          ]
        })
      ]
    }))
  });

  const bodyRows = rowsData.map((row, rIdx) => {
    const isLast = rIdx === rowsData.length - 1;
    return new TableRow({
      children: row.map((cellText, cIdx) => new TableCell({
        shading: { fill: rIdx % 2 === 0 ? 'FFFFFF' : 'FBFBFB', type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: isLast 
            ? { style: BorderStyle.SINGLE, size: 8, color: COLOR_BLACK }
            : { style: BorderStyle.SINGLE, size: 2, color: COLOR_GREY_BORDER },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE }
        },
        width: colWidths[cIdx] ? { size: colWidths[cIdx], type: WidthType.PERCENTAGE } : undefined,
        children: [
          new Paragraph({
            alignment: cIdx === 0 ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: cellText,
                font: FONT_FAMILY,
                size: 20, // 10pt
                color: COLOR_BLACK
              })
            ]
          })
        ]
      }))
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...bodyRows]
  });
}

// Assemble Document Content
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT_FAMILY, size: 22, color: COLOR_BLACK }
      }
    }
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch margins
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "GENERATIVE PRE-TRAINED TRANSFORMER (GPT) // TECHNICAL MONOGRAPH",
                  font: FONT_FAMILY,
                  size: 18, // 9pt
                  color: COLOR_GREY_DARK
                })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Page ",
                  font: FONT_FAMILY,
                  size: 18,
                  color: COLOR_GREY_DARK
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: FONT_FAMILY,
                  size: 18,
                  color: COLOR_GREY_DARK
                }),
                new TextRun({
                  text: " of ",
                  font: FONT_FAMILY,
                  size: 18,
                  color: COLOR_GREY_DARK
                }),
                new TextRun({
                  children: [PageNumber.TOTAL_PAGES],
                  font: FONT_FAMILY,
                  size: 18,
                  color: COLOR_GREY_DARK
                })
              ]
            })
          ]
        })
      },
      children: [
        // TITLE BLOCK (Formal Academic Style)
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 300, after: 100 },
          children: [
            new TextRun({
              text: "ARCHITECTURAL FOUNDATIONS AND COMPUTATIONAL MECHANICS OF GENERATIVE PRE-TRAINED TRANSFORMERS",
              bold: true,
              font: FONT_FAMILY,
              size: 30, // 15pt
              color: COLOR_BLACK
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 140 },
          children: [
            new TextRun({
              text: "A Comprehensive Engineering Monograph on Decoder-Only Neural Sequence Synthesis, Causal Attention, Multi-Stage Alignment, and Factual Reliability",
              italics: true,
              font: FONT_FAMILY,
              size: 22,
              color: COLOR_CHARCOAL
            })
          ]
        }),

        // Author & Affiliation
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: "Division of Artificial Intelligence Systems & Computational Linguistics",
              font: FONT_FAMILY,
              size: 20,
              color: COLOR_BLACK
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Publication Reference: TECH-MONO-2026-GPT4 | Peer Review & Technical Documentation Standards",
              font: FONT_FAMILY,
              size: 18,
              color: COLOR_GREY_DARK
            })
          ]
        }),

        // Horizontal Separator
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 180 },
          children: [
            new TextRun({
              text: "_________________________________________________________________________________",
              font: FONT_FAMILY,
              size: 18,
              color: COLOR_GREY_BORDER
            })
          ]
        }),

        // ABSTRACT
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 60, after: 60 },
          children: [
            new TextRun({ text: "Abstract—", bold: true, font: FONT_FAMILY, size: 20 }),
            new TextRun({
              text: "This academic monograph provides an exhaustive technical analysis of the Generative Pre-trained Transformer (GPT) architecture. Developed as a specialized decoder-only derivative of the multi-head self-attention mechanism originally formulated by Vaswani et al. (2017), GPT models represent a foundational paradigm shift in statistical natural language processing and synthetic sequence generation. We deconstruct the three core theoretical pillars (Generative autoregression, Pre-trained statistical representations, and Transformer attention networks), the five-layer internal tensor projection stack, the causal upper-triangular attention mask, and the Byte-Pair Encoding (BPE) subword tokenization regime. Furthermore, this report details the end-to-end inference workflow, the four-stage model alignment pipeline (unsupervised pre-training, supervised fine-tuning, preference optimization via RLHF/DPO, and safety evaluation), the historical scaling trajectory spanning GPT-1 (117M parameters) through multimodal mixture-of-experts systems, and the structural demarcation between foundational models and consumer chat interfaces. Finally, we examine systemic failure modes—specifically the mathematical roots of the hallucination problem—and evaluate emerging research vectors encompassing test-time reasoning compute, formal verification, and agentic actuation.",
              font: FONT_FAMILY,
              size: 20,
              color: COLOR_BLACK
            })
          ]
        }),

        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 60, after: 200 },
          children: [
            new TextRun({ text: "Keywords—", bold: true, font: FONT_FAMILY, size: 20 }),
            new TextRun({
              text: "Autoregressive generation, causal self-attention, decoder-only transformer, reinforcement learning from human feedback (RLHF), subword tokenization, temperature sampling, hallucination mitigation.",
              italics: true,
              font: FONT_FAMILY,
              size: 20,
              color: COLOR_BLACK
            })
          ]
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // TABLE OF CONTENTS (Compact Academic Layout)
        h1("0", "Table of Contents"),
        pBody("1. Introduction and Architectural Motivation .......................................................................... 3"),
        pBody("2. Theoretical Foundations: Decoding the Acronym ................................................................ 3"),
        pBody("3. Five-Layer Decoder-Only Tensor Specification ................................................................... 4"),
        pBody("4. Mathematical Formulation of Causal Multi-Head Attention ................................................ 5"),
        pBody("5. Core Primitives and Byte-Pair Subword Tokenization ........................................................... 6"),
        pBody("6. End-to-End Inference Workflow and Autoregressive Sampling ............................................ 7"),
        pBody("7. The Four-Stage Alignment and Training Pipeline ............................................................... 8"),
        pBody("8. Empirical Evolution and Historical Scaling Dynamics (2018–2026) .................................... 9"),
        pBody("9. Industrial Deployments and the Search Engine Paradigm Shift .......................................... 10"),
        pBody("10. Systemic Constraints, Ethical Boundaries, and Hallucination Mechanics .......................... 11"),
        pBody("11. Future Trajectories: Test-Time Compute, Reasoning, and Agency ..................................... 12"),
        pBody("12. Concluding Synthesis and Epistemological Axiom ............................................................. 13"),
        pBody("13. Comprehensive Bibliography and Academic Citations ...................................................... 14"),

        new Paragraph({ children: [new PageBreak()] }),

        // SECTION 1
        h1("1", "Introduction and Architectural Motivation"),
        pBody("Before the advent of attention-driven sequence modeling, computational linguistics relied predominantly on recurrent neural networks (RNNs), Long Short-Term Memory (LSTM) cells, and gated recurrent units (GRUs). While these architectures effectively handled sequential information by propagating a hidden state across sequential time steps, they suffered from two severe mathematical constraints:"),
        pBullet("Vanishing and Exploding Gradients:", "Backpropagation through time (BPTT) across lengthy sequences caused exponential gradient decay, fundamentally restricting the context window and preventing long-range dependency resolution."),
        pBullet("Sequential Hardware Bottlenecks:", "Because the computational state at step t strictly depended on the realization of state t-1, RNN architectures resisted parallel execution across modern graphics processing units (GPUs) and tensor processing units (TPUs)."),
        pBody("The introduction of the Transformer architecture by Vaswani et al. (2017) eliminated recurrence entirely in favor of scaled dot-product self-attention. OpenAI subsequently proved that discarding the encoder entirely and scaling a pure decoder-only stack across massive unannotated web corpora yields emergent linguistic reasoning, multi-task transfer, and generative fluency without task-specific architectural modification."),

        // SECTION 2
        h1("2", "Theoretical Foundations: Decoding the Acronym"),
        pBody("The designation 'GPT' represents the convergence of three foundational paradigms into a unified probabilistic sequence model:"),
        
        h2("2.1", "Generative Modeling"),
        pBody("Unlike discriminative classifiers that compute conditional class boundaries P(Y|X), generative sequence models approximate the joint probability distribution P(X) of language. Formally, a text sequence consisting of T tokens is decomposed via the probability chain rule into a product of conditional probabilities:"),
        equation("P(w_1, w_2, ..., w_T) = \\prod_{t=1}^T P(w_t \\mid w_1, ..., w_{t-1})", "1"),
        pBody("Each token prediction is conditioned strictly upon the preceding historical context, establishing the foundational principle of autoregressive generation."),

        h2("2.2", "Pre-trained Representations"),
        pBody("Supervised machine learning historically required extensive, hand-annotated training corpora—an economically unviable approach for general intelligence. Pre-training circumvents this bottleneck by utilizing unsupervised (or self-supervised) next-token prediction across trillions of words from literature, code repositories, encyclopedia records, and public web pages. The pre-training loss objective minimizes the negative log-likelihood over the empirical data distribution:"),
        equation("\\mathcal{L}_{pre}(\\theta) = -\\sum_{i=1}^N \\log P_\\theta(u_i \\mid u_{i-k}, \\dots, u_{i-1})", "2"),
        pBody("Through this objective, the neural network internalizes syntactic rules, factual associations, logical implications, and algorithmic structures prior to any task adaptation."),

        h2("2.3", "Transformer Attention Mechanics"),
        pBody("The transformer framework replaces recurrence with pairwise dot-product affinity matrices. For an arbitrary input sequence, the network computes connections between all token pairs simultaneously in O(1) sequential operations, completely bypassing sequential distance decay."),

        // SECTION 3
        h1("3", "Five-Layer Decoder-Only Tensor Specification"),
        pBody("As illustrated in Slide 5 of the architectural presentation, a standard GPT block features a layered, hierarchical feed-forward structure. Each repeating block processes sequence representations through standardized tensor dimensions."),

        caption("Table 1", "Layer-by-Layer Architectural and Mathematical Tensor Contract"),
        academicTable(
          ["Layer Level", "Structural Layer Name", "Mathematical Tensor Shape", "Primary Computational Function"],
          [
            ["Layer 05", "Output Layer & Unembedding", "[Batch, SeqLen, VocabSize]", "Applies final RMSNorm, projects hidden states via unembedding matrix W_u, and computes normalized Softmax probabilities."],
            ["Layer 04", "Feed-Forward Network (FFN/MLP)", "[Batch, SeqLen, 4 × d_model]", "Two-stage pointwise linear projections with non-linear activation (GELU/SwiGLU). Functions as associative factual memory."],
            ["Layer 03", "Masked Multi-Head Attention", "[Batch, Heads, SeqLen, d_k]", "Calculates contextual token affinity scores while enforcing causal time masking via an upper-triangular -infinity matrix."],
            ["Layer 02", "Token & Positional Embeddings", "[Batch, SeqLen, d_model]", "Maps discrete integer token IDs into dense vector manifolds and injects spatial sequence ordering via RoPE or learned matrices."],
            ["Layer 01", "Input Tokens (Raw Sequence)", "[Batch, SeqLen]", "Raw natural language converted into discrete vocabulary index integers via Byte-Pair Encoding (BPE)."]
          ],
          [15, 25, 25, 35]
        ),

        // SECTION 4
        h1("4", "Mathematical Formulation of Causal Multi-Head Attention"),
        pBody("The primary engine of the decoder-only transformer is the Multi-Head Attention (MHA) module equipped with causal masking. Each incoming hidden representation H is projected into three distinct tensor subspaces using learned weight matrices:"),
        pBullet("Queries (Q = H W_Q):", "Represent the current token's search intent when inspecting context."),
        pBullet("Keys (K = H W_K):", "Represent the contextual addresses or features against which queries match."),
        pBullet("Values (V = H W_V):", "Contain the substantive semantic payload propagated forward upon successful matching."),
        pBody("Scaled Dot-Product Attention calculates token-to-token compatibility scores divided by the square root of key dimensionality d_k to prevent gradient vanishing in large dimensions:"),
        equation("\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)V", "3"),
        pBody("The causal mask matrix M is mathematically essential. Without M, self-attention would compute bidirectional connections, allowing token t to perceive token t+1 during training. To enforce autoregressive causality, M is defined as:"),
        equation("M_{ij} = \\begin{cases} 0 & \\text{if } i \\ge j \\\\ -\\infty & \\text{if } i < j \\end{cases}", "4"),
        pBody("Because exp(-infinity) = 0, the Softmax denominator assigns exactly zero probability mass to future tokens, preventing information leakage."),

        // SECTION 5
        h1("5", "Core Primitives and Byte-Pair Subword Tokenization"),
        pBody("As cataloged in Slide 6 of the foundation specification, language models rely on eight essential operational components:"),
        pBullet("1. Token:", "The minimal semantic subword chunk processed by the network (~0.75 English words)."),
        pBullet("2. Embedding:", "Continuous high-dimensional vector representations mapping semantic similarity into metric distances."),
        pBullet("3. Parameter:", "The trainable weights and biases optimized by gradient descent during pre-training."),
        pBullet("4. Context Window:", "The absolute memory ceiling (in tokens) processed concurrently in a single forward pass."),
        pBullet("5. Attention:", "The relevance mechanism determining dynamic affinity between distinct sequence positions."),
        pBullet("6. Inference:", "The frozen production forward pass computing logits without updating model weights."),
        pBullet("7. Fine-Tuning:", "Secondary domain-specific supervised training on curated task datasets."),
        pBullet("8. Tokenization:", "The deterministic algorithm decomposing raw Unicode text into integer sequences."),
        pBody("Byte-Pair Encoding (BPE) starts with individual bytes and iteratively merges the most frequent adjacent pairs in a training corpus. For example, the sentence 'GPT generates text.' is deterministically mapped to four discrete tokens: ['GPT', ' generates', ' text', '.']. Subword algorithms eliminate out-of-vocabulary exceptions by falling back to UTF-8 byte representations when unfamiliar character sequences appear."),

        // SECTION 6
        h1("6", "End-to-End Inference Workflow and Autoregressive Sampling"),
        pBody("The inference cycle represents an iterative feedback loop consisting of seven discrete phases:"),
        pBullet("Phase 1 (Input Acquisition):", "The user inputs a raw string prompt (e.g., 'Artificial Intelligence is')."),
        pBullet("Phase 2 (Tokenization):", "BPE decomposes the input into vocabulary indices [19478, 12754, 318]."),
        pBullet("Phase 3 (Vector Projection):", "Token IDs are translated into dense vectors and concatenated with positional embeddings."),
        pBullet("Phase 4 (Transformer Forward Pass):", "Stacked layers of causal attention and feed-forward networks extract contextual representations."),
        pBullet("Phase 5 (Next-Token Logits Computation):", "The final layer projects hidden states onto vocabulary logits, producing candidate probabilities: 'transforming' (60%), 'changing' (30%), 'developing' (10%)."),
        pBullet("Phase 6 (Sampling & Context Loopback):", "The selected token is appended to the context, and the pipeline re-executes autoregressively."),
        pBullet("Phase 7 (Detokenization Stream):", "The generated token stream is converted back into UTF-8 characters and rendered to the user until an <|endoftext|> terminal token is emitted."),
        pBody("During Phase 5, token selection is governed by the Temperature hyperparameter T:"),
        equation("P(w_i) = \\frac{\\exp(z_i / T)}{\\sum_j \\exp(z_j / T)}", "5"),
        pBody("When T approaches 0, the sampling function collapses into greedy argmax selection, rendering outputs deterministic. As T increases, probability entropy broadens, introducing semantic diversity at the expense of factual stability."),

        // SECTION 7
        h1("7", "The Four-Stage Alignment and Training Pipeline"),
        pBody("Modern foundational models do not transition directly from raw web data to consumer products. Slide 8 outlines the four-stage lifecycle required to achieve safe and effective deployment:"),

        caption("Table 2", "The Four Core Stages of the Language Model Training Pipeline"),
        academicTable(
          ["Stage", "Pipeline Name", "Data Modality & Volume", "Primary Objective & Loss Formulation"],
          [
            ["Phase 01", "Unsupervised Pre-training", "5–15+ Trillion tokens of raw web, code, books, and articles.", "Minimizing next-token cross-entropy loss: L = -log P(token_t | tokens_<t). Accounts for 98%+ of total compute expenditure."],
            ["Phase 02", "Supervised Fine-Tuning (SFT)", "10,000–100,000 curated expert instruction-response pairs.", "Conditioning the model to follow prompt directions, adopt a conversational assistant persona, and format responses."],
            ["Phase 03", "Preference Optimization (RLHF/DPO)", "Pairwise human preference evaluations (Chosen vs. Rejected).", "Aligning policy behavior using Proximal Policy Optimization (PPO) or Direct Preference Optimization (DPO) to maximize helpfulness and harmlessness."],
            ["Phase 04", "Evaluation & Red Teaming", "Adversarial jailbreak suites, safety probes, and academic benchmarks.", "Stress-testing for biosecurity hazards, unauthorized exploitation, mathematical precision, and catastrophic refusal failures."]
          ],
          [12, 28, 30, 30]
        ),

        // SECTION 8
        h1("8", "Empirical Evolution and Historical Scaling Dynamics (2018–2026)"),
        pBody("The evolution of the GPT family illustrates empirical validation of neural scaling laws, wherein power-law relationships govern model performance relative to compute (FLOPs), dataset scale, and parameter count."),

        caption("Table 3", "Empirical Progression of the OpenAI GPT Architecture Family"),
        academicTable(
          ["Year", "Model Designation", "Parameter Count", "Context Window", "Architectural Milestone & Impact"],
          [
            ["2018", "GPT-1", "117 Million", "512 tokens", "Introduced generative pre-training for downstream transfer."],
            ["2019", "GPT-2", "1.5 Billion", "1,024 tokens", "Demonstrated high zero-shot task transfer without task fine-tuning."],
            ["2020", "GPT-3", "175 Billion", "2,048 tokens", "Established in-context few-shot prompting; 100x scale increase."],
            ["2022", "GPT-3.5 / ChatGPT", "~175 Billion", "4,096 tokens", "Pioneered consumer conversational RLHF alignment."],
            ["2023", "GPT-4", "~1.8 Trillion (MoE)", "32k–128k tokens", "Mixture-of-Experts routing; achieved 90th percentile bar exam score."],
            ["2024", "GPT-4o (Omni)", "Undisclosed Dense/MoE", "128,000 tokens", "Native end-to-end multimodal perception (audio, vision, text)."],
            ["2025/26", "Frontier (o1/o3/GPT-5)", "Adaptive Compute", "200,000+ tokens", "Test-time reasoning search; System-2 chain-of-thought verification."]
          ],
          [10, 20, 20, 18, 32]
        ),

        pBody("Crucial Architectural Distinction: As underscored in Slide 4, engineering practitioners must strictly distinguish between 'GPT' (the underlying foundational neural network weights) and 'ChatGPT' (the consumer web product, interface guardrails, user session state, and orchestration software)."),

        // SECTION 9
        h1("9", "Industrial Deployments and the Search Engine Paradigm Shift"),
        pBody("Slide 12 defines the fundamental paradigm shift between traditional information retrieval and generative transformer synthesis:"),
        pBody("'Search engines retrieve the past; GPT synthesizes the prompt.'"),
        pBody("Traditional search engines employ web crawlers, inverted keyword indices, and deterministic ranking algorithms (e.g., BM25, PageRank) to point users toward existing third-party web addresses. In contrast, GPT architectures project natural language inquiries through trained neural manifolds, synthesizing customized explanations, algorithmic implementations, and cross-domain analogies in real time."),

        caption("Table 4", "Comparative Analysis: Traditional Search vs. Generative Transformer Architecture"),
        academicTable(
          ["Dimension", "Traditional Search Engine (Retrieval-Based)", "GPT Architecture (Generation-Based)"],
          [
            ["Core Mechanism", "Indexes and ranks existing web documents via inverted indices.", "Predicts sequence probabilities conditioned on input prompts."],
            ["Primary Output", "Ranked list of external hyperlinks, metadata, and web snippets.", "Directly synthesized, customized explanations, prose, or code."],
            ["Optimal Utility", "Source verification, real-time news retrieval, binary downloads.", "Complex ideation, code debugging, summarization, and translation."],
            ["Query Handling", "Rigid keyword matching; sensitive to Boolean search syntax.", "Contextual intent disambiguation and conversational multi-turn refinement."]
          ],
          [20, 40, 40]
        ),

        // SECTION 10
        h1("10", "Systemic Constraints, Ethical Boundaries, and Hallucination Mechanics"),
        pBody("Despite remarkable generative fluency, decoder-only transformers present inherent architectural vulnerabilities, as categorized in Slide 11:"),
        pBullet("Algorithmic Bias:", "Models replicate demographic skews, cultural prejudices, and historical inaccuracies embedded within uncurated pre-training corpora."),
        pBullet("Data Privacy and Exfiltration:", "Sensitive enterprise secrets or personally identifiable information (PII) present in training data can be extracted via prompt inversion attacks."),
        pBullet("Context Window Constraints:", "Despite expanding context windows, models experience the 'lost in the middle' phenomenon, exhibiting degraded recall for entities placed midway through long prompts."),
        pBullet("Static Knowledge Cutoff:", "Model parameters remain frozen following training completion, rendering models blind to real-time events without tool augmentation."),
        pBullet("Computational and Energy Expenditure:", "Frontier training runs consume megawatts of electrical power and require thousands of high-bandwidth memory (HBM) accelerator clusters."),

        h2("10.1", "The Hallucination Problem"),
        pBody("Slide 11 explicitly highlights the Hallucination Problem: 'Occurs when an AI generates information that appears credible but is entirely fabricated, unsupported, or false (e.g., inventing nonexistent citations).'"),
        pBody("Root Cause Analysis: Language models optimize purely for statistical next-token plausibility, not epistemological truth. When asked to provide a legal citation or DOI number, the model selects words that match the syntactic structure of authentic citations, regardless of whether the referenced case or paper exists in physical reality."),
        pBody("Engineering Mitigations: Industry standards address hallucinations through Retrieval-Augmented Generation (RAG), external tool execution (sandboxed code interpreters), and Chain-of-Verification (CoVe) protocols."),

        // SECTION 11
        h1("11", "Future Trajectories: Test-Time Compute, Reasoning, and Agency"),
        pBody("Slide 13 maps the transition from standalone text-heavy language models to four forward-looking computational vectors:"),
        pBullet("1. Advanced Native Multimodality:", "Moving beyond separate vision encoders to unified omni-modal representations processing continuous audio, real-time video, and text."),
        pBullet("2. Test-Time Reasoning Compute:", "Scaling compute during the inference phase via Monte Carlo Tree Search (MCTS), process-supervised reward models (PRMs), and hidden chain-of-thought tokens (e.g., OpenAI o1/o3)."),
        pBullet("3. Verifiable Formal Systems:", "Integrating theorem provers (Lean, Coq) and deterministic program verification to drive factual error rates to zero in critical domains."),
        pBullet("4. Autonomous Tool Integration (Agentic AI):", "Enabling models to formulate multi-step plans, operate command-line environments, invoke external APIs, and execute complex workflows without continuous human intervention."),

        // SECTION 12
        h1("12", "Concluding Synthesis and Epistemological Axiom"),
        pBody("The architectural evolution of the Generative Pre-trained Transformer demonstrates that scaling self-supervised next-token prediction across multi-head attention networks produces emergent reasoning capabilities. However, technical practitioners must operate with methodological clarity."),
        pBody("Slide 14 articulates the governing philosophical and engineering axiom of modern artificial intelligence:"),
        pBody("'GPT is a powerful intelligent assistance system, but its outputs fundamentally require human verification and professional judgement.'"),
        pBody("Transformers do not possess consciousness, intent, or independent factual awareness; they are mathematical sequence synthesizers. When paired with human expertise, rigorous verification pipelines, and principled software design, they represent one of the most transformative computational instruments in the history of computer science."),

        // SECTION 13
        h1("13", "Comprehensive Bibliography and Academic Citations"),
        pBullet("Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017).", "Attention is all you need. In Advances in Neural Information Processing Systems (NeurIPS 2017), Vol. 30, pp. 5998–6008. https://arxiv.org/abs/1706.03762"),
        pBullet("Radford, A., Narasimhan, K., Salimans, T., & Sutskever, I. (2018).", "Improving language understanding by generative pre-training. OpenAI Technical Report."),
        pBullet("Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & Sutskever, I. (2019).", "Language models are unsupervised multitask learners. OpenAI Blog, 1(8), 9."),
        pBullet("Brown, T., Mann, B., Ryder, N., Subbiah, M., Kaplan, J. D., Dhariwal, P., ... & Amodei, D. (2020).", "Language models are few-shot learners. In Advances in Neural Information Processing Systems (NeurIPS 2020), Vol. 33, pp. 1877–1901."),
        pBullet("Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C., Mishkin, P., ... & Lowe, R. (2022).", "Training language models to follow instructions with human feedback. In Advances in Neural Information Processing Systems (NeurIPS 2022), Vol. 35, pp. 27730–27744."),
        pBullet("OpenAI. (2023).", "GPT-4 Technical Report. arXiv preprint arXiv:2303.08774. https://arxiv.org/abs/2303.08774"),
        pBullet("Wolf, T., Debut, L., Sanh, V., Chaumond, J., Delangue, C., Moi, A., ... & Rush, A. M. (2020).", "Transformers: State-of-the-art natural language processing. In Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing: System Demonstrations, pp. 38–45."),
        pBullet("Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., ... & Amodei, D. (2020).", "Scaling laws for neural language models. arXiv preprint arXiv:2001.08361.")
      ]
    }
  ]
});

// Output execution
const outputPath = path.join(process.cwd(), 'GPT_Architecture_Academic_Report.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated publication-grade academic report at: ${outputPath}`);
}).catch(err => {
  console.error("Error generating academic DOCX:", err);
  process.exit(1);
});

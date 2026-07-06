import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Cpu, 
  Sliders, 
  BookOpen, 
  HelpCircle,
  Flame,
  Check
} from "lucide-react";

// Types
interface BitStep {
  columnIndex: number;
  operandAVal: number;
  operandBVal: number;
  resultVal: number;
  explanation: string;
  activeBitA: number;
  activeBitB: number | null;
  activeBitRes: number;
}

// Preset Bit Hacks Recipes
interface Recipe {
  id: string;
  name: string;
  expression: string;
  description: string;
  operandA: number;
  operandB: number;
  operator: string;
  width: 8 | 16;
  isSigned: boolean;
  explanationSteps: string[];
}

const BIT_RECIPES: Recipe[] = [
  {
    id: "odd_even",
    name: "Check Odd/Even Parity",
    expression: "x & 1",
    description: "Determines if a number is odd or even by inspecting the least significant bit (LSB).",
    operandA: 43,
    operandB: 1,
    operator: "&",
    width: 8,
    isSigned: false,
    explanationSteps: [
      "Any odd integer in binary always ends with a 1 (e.g., 43 is 00101011).",
      "Any even integer always ends with a 0.",
      "Performing a bitwise AND with 1 (00000001) zero-masks all bits except the LSB.",
      "If the result is 1, the number is Odd. If the result is 0, the number is Even."
    ]
  },
  {
    id: "clear_lowest",
    name: "Clear Lowest Set Bit",
    expression: "x & (x - 1)",
    description: "Turns off the rightmost active bit (the lowest 1 bit) of a binary register.",
    operandA: 52, // 00110100
    operandB: 51, // 00110011
    operator: "&",
    width: 8,
    isSigned: false,
    explanationSteps: [
      "Subtracting 1 from a number flips all trailing zeros to 1s, and flips the lowest set (1) bit to 0.",
      "For example: 52 (00110100) minus 1 is 51 (00110011). Notice the LSB block changed.",
      "When we perform A & B (52 & 51), the overlapping set bits are preserved, but the lowest active bit of 52 is cleared.",
      "Result is 48 (00110000). This is commonly used in algorithms like Fenwick Trees or counting set bits (Kernighan's Algorithm)."
    ]
  },
  {
    id: "isolate_lowest",
    name: "Isolate Lowest Set Bit",
    expression: "x & -x",
    description: "Extracts only the rightmost set bit, zeroing out all other bits.",
    operandA: 20, // 00010100
    operandB: -20, // -20 in 8-bit signed is 11101100
    operator: "&",
    width: 8,
    isSigned: true,
    explanationSteps: [
      "In 2's complement, negation (-x) is computed by flipping all bits (~x) and adding 1.",
      "This process preserves the rightmost set bit and flips all bits to its left.",
      "For example: 20 is 00010100. Its negation -20 is 11101100.",
      "Performing a bitwise AND (20 & -20) isolates the single bit: 00000100 (which is 4)."
    ]
  },
  {
    id: "power_of_two",
    name: "Check Power of 2",
    expression: "(x > 0) && (x & (x - 1)) == 0",
    description: "Quickly checks if a positive number is an exact power of 2.",
    operandA: 64, // 01000000
    operandB: 63, // 00111111
    operator: "&",
    width: 8,
    isSigned: false,
    explanationSteps: [
      "Powers of 2 have exactly one bit set to 1 in their binary representation (e.g., 64 is 01000000).",
      "Subtracting 1 from a power of 2 flips that single set bit to 0 and all trailing zeros to 1s (63 is 00111111).",
      "Performing A & (A - 1) results in 0 (01000000 & 00111111 = 0).",
      "Since there is no overlap, any number that yields 0 under this operation is a power of 2 (if greater than 0)."
    ]
  },
  {
    id: "swap_xor",
    name: "XOR Swap Trick",
    expression: "A ^ B",
    description: "Swaps two registers without using a third temporary variable.",
    operandA: 170, // 10101010
    operandB: 85,  // 01010101
    operator: "^",
    width: 8,
    isSigned: false,
    explanationSteps: [
      "XOR represents differences. A ^ B produces a mask where bits are set if A and B differ.",
      "Applying XOR multiple times allows retrieving the original values because x ^ x = 0 and x ^ 0 = x.",
      "Step 1: A = A ^ B (A stores the difference mask).",
      "Step 2: B = A ^ B (B retrieves original A).",
      "Step 3: A = A ^ B (A retrieves original B). Now they are swapped!"
    ]
  }
];

export default function BitwiseVisualizer() {
  const [bitWidth, setBitWidth] = useState<8 | 16>(8);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [operandA, setOperandA] = useState<number>(90);
  const [operandB, setOperandB] = useState<number>(60);
  const [operator, setOperator] = useState<string>("&");
  const [shiftAmount, setShiftAmount] = useState<number>(1);
  const [activeRecipe, setActiveRecipe] = useState<string>("");

  // Animation & Execution Trace States
  const [steps, setSteps] = useState<BitStep[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(600); // ms delay
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper: Calculate bounds
  const getBounds = useCallback(() => {
    if (isSigned) {
      return bitWidth === 8 
        ? { min: -128, max: 127 } 
        : { min: -32768, max: 32767 };
    } else {
      return bitWidth === 8 
        ? { min: 0, max: 255 } 
        : { min: 0, max: 65535 };
    }
  }, [bitWidth, isSigned]);

  // Helper: Convert number to binary array
  const toBinaryArray = useCallback((val: number, width: number): number[] => {
    const bits: number[] = [];
    const absolute = val < 0 ? (1 << width) + val : val;
    for (let i = width - 1; i >= 0; i--) {
      bits.push((absolute >> i) & 1);
    }
    return bits;
  }, []);

  // Helper: Convert binary array to integer (handles signed 2's complement)
  const fromBinaryArray = useCallback((bits: number[], signed: boolean): number => {
    let val = 0;
    const width = bits.length;
    for (let i = 0; i < width; i++) {
      val = (val << 1) | bits[i];
    }
    if (signed && bits[0] === 1) {
      val = val - (1 << width);
    }
    return val;
  }, []);

  // Sync Input ranges when parameters change
  useEffect(() => {
    const { min, max } = getBounds();
    setOperandA((prev) => Math.min(Math.max(prev, min), max));
    setOperandB((prev) => Math.min(Math.max(prev, min), max));
  }, [bitWidth, isSigned, getBounds]);

  // Generate the Step-by-Step execution trace
  const generateTrace = useCallback(() => {
    const newSteps: BitStep[] = [];
    const bitsA = toBinaryArray(operandA, bitWidth);
    
    // Determine operand B bits
    let effectiveB = operandB;
    if (operator === "<<" || operator === ">>") {
      effectiveB = shiftAmount;
    }
    const bitsB = toBinaryArray(effectiveB, bitWidth);

    // Calculate overall result
    let overallResVal = 0;
    if (operator === "&") overallResVal = operandA & operandB;
    else if (operator === "|") overallResVal = operandA | operandB;
    else if (operator === "^") overallResVal = operandA ^ operandB;
    else if (operator === "~") overallResVal = ~operandA;
    else if (operator === "<<") overallResVal = operandA << shiftAmount;
    else if (operator === ">>") {
      overallResVal = isSigned ? (operandA >> shiftAmount) : (operandA >>> shiftAmount);
    }

    // Mask output within register size
    const mask = (1 << bitWidth) - 1;
    let finalResVal = overallResVal & mask;
    if (isSigned) {
      const msb = 1 << (bitWidth - 1);
      if (finalResVal & msb) {
        finalResVal = finalResVal - (1 << bitWidth);
      }
    }
    const bitsRes = toBinaryArray(finalResVal, bitWidth);

    // 1. Initial State Step
    newSteps.push({
      columnIndex: -1,
      operandAVal: operandA,
      operandBVal: effectiveB,
      resultVal: 0,
      explanation: `Initialized inputs. Register size: ${bitWidth}-bit (${isSigned ? "Signed 2's Complement" : "Unsigned"}).`,
      activeBitA: 0,
      activeBitB: null,
      activeBitRes: 0,
    });

    // 2. Step-by-step column analysis
    let runningResultBits = Array(bitWidth).fill(0);

    for (let idx = 0; idx < bitWidth; idx++) {
      const bitIndex = bitWidth - 1 - idx; // Right to Left column tracking
      const bitA = bitsA[bitIndex];
      const bitB = bitsB[bitIndex];
      const bitRes = bitsRes[bitIndex];

      runningResultBits[bitIndex] = bitRes;
      const runningResultVal = fromBinaryArray(runningResultBits, isSigned);

      let explanation = "";
      if (operator === "&") {
        explanation = `Column 2^${idx}: A is ${bitA}, B is ${bitB}. ${bitA} & ${bitB} = ${bitRes}. Both must be 1 to result in 1.`;
      } else if (operator === "|") {
        explanation = `Column 2^${idx}: A is ${bitA}, B is ${bitB}. ${bitA} | ${bitB} = ${bitRes}. Either being 1 yields 1.`;
      } else if (operator === "^") {
        explanation = `Column 2^${idx}: A is ${bitA}, B is ${bitB}. ${bitA} ^ ${bitB} = ${bitRes}. Yields 1 because bits are ${bitA === bitB ? "identical" : "different"}.`;
      } else if (operator === "~") {
        explanation = `Column 2^${idx}: A is ${bitA}. ~${bitA} = ${bitRes}. Inverts 0 to 1 and vice-versa.`;
      } else if (operator === "<<") {
        const sourceIdx = bitIndex + shiftAmount;
        if (sourceIdx < bitWidth) {
          explanation = `Column 2^${idx}: Receives bit value ${bitsA[sourceIdx]} shifted left from column 2^${idx - shiftAmount}.`;
        } else {
          explanation = `Column 2^${idx}: Out of bounds shift. Padded with 0.`;
        }
      } else if (operator === ">>") {
        const sourceIdx = bitIndex - shiftAmount;
        if (sourceIdx >= 0) {
          explanation = `Column 2^${idx}: Receives bit value ${bitsA[sourceIdx]} shifted right from column 2^${idx + shiftAmount}.`;
        } else {
          if (isSigned) {
            explanation = `Column 2^${idx}: Sign extension pads the sign bit (${bitsA[0]}) at index 2^${bitWidth - 1}.`;
          } else {
            explanation = `Column 2^${idx}: Logical right shift pads with 0.`;
          }
        }
      }

      newSteps.push({
        columnIndex: bitIndex,
        operandAVal: operandA,
        operandBVal: effectiveB,
        resultVal: runningResultVal,
        explanation,
        activeBitA: bitA,
        activeBitB: operator !== "~" ? bitB : null,
        activeBitRes: bitRes,
      });
    }

    // 3. Final Step
    newSteps.push({
      columnIndex: 99,
      operandAVal: operandA,
      operandBVal: effectiveB,
      resultVal: finalResVal,
      explanation: `Execution completed. Final result: ${finalResVal} (Hex: 0x${(finalResVal < 0 ? (1 << bitWidth) + finalResVal : finalResVal).toString(16).toUpperCase()}).`,
      activeBitA: 0,
      activeBitB: null,
      activeBitRes: 0,
    });

    setSteps(newSteps);
    setStepIndex(0);
  }, [operandA, operandB, operator, shiftAmount, bitWidth, isSigned, toBinaryArray, fromBinaryArray]);

  // Recalculate trace whenever inputs change
  useEffect(() => {
    generateTrace();
  }, [generateTrace]);

  // Playback engine
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const handleBitClick = (operand: "A" | "B", bitIdx: number) => {
    setIsPlaying(false);
    const currentVal = operand === "A" ? operandA : operandB;
    const bits = toBinaryArray(currentVal, bitWidth);
    
    // Flip bit
    bits[bitIdx] = bits[bitIdx] === 1 ? 0 : 1;
    const newVal = fromBinaryArray(bits, isSigned);

    if (operand === "A") setOperandA(newVal);
    else setOperandB(newVal);
    setActiveRecipe("");
  };

  const handleDecimalChange = (operand: "A" | "B", input: string) => {
    setIsPlaying(false);
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) return;
    
    const { min, max } = getBounds();
    const clamped = Math.min(Math.max(parsed, min), max);

    if (operand === "A") setOperandA(clamped);
    else setOperandB(clamped);
    setActiveRecipe("");
  };

  const handleHexChange = (operand: "A" | "B", input: string) => {
    setIsPlaying(false);
    const cleaned = input.replace(/[^0-9A-Fa-f]/g, "");
    if (!cleaned) return;
    
    let parsed = parseInt(cleaned, 16);
    if (isNaN(parsed)) return;

    // Handle signed hex parsing
    if (isSigned) {
      const maxUnsigned = 1 << bitWidth;
      if (parsed >= maxUnsigned / 2) {
        parsed = parsed - maxUnsigned;
      }
    }

    const { min, max } = getBounds();
    const clamped = Math.min(Math.max(parsed, min), max);

    if (operand === "A") setOperandA(clamped);
    else setOperandB(clamped);
    setActiveRecipe("");
  };

  const applyRecipe = (recipe: Recipe) => {
    setIsPlaying(false);
    setBitWidth(recipe.width);
    setIsSigned(recipe.isSigned);
    setOperator(recipe.operator);
    setOperandA(recipe.operandA);
    setOperandB(recipe.operandB);
    setActiveRecipe(recipe.id);
    setStepIndex(0);
  };

  // Convert inputs to lists for visualization
  const bitsA = toBinaryArray(operandA, bitWidth);
  const bitsB = toBinaryArray(operator === "<<" || operator === ">>" ? shiftAmount : operandB, bitWidth);
  
  // Calculate current active step data
  const currentStep = steps[stepIndex] || null;
  const runningResultBits = toBinaryArray(currentStep ? currentStep.resultVal : 0, bitWidth);

  // Dark/Light theme helper
  const isDark = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <div style={{ padding: "8px", fontFamily: "var(--ifm-font-family-base)", color: "var(--ifm-font-color-base)" }}>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 14px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "30px", marginBottom: "8px" }}>
          <Cpu size={16} color="#6366f1" />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>Visual Playground</span>
        </div>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Bitwise Operations & Masking</h2>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--ifm-color-emphasis-600)" }}>
          Flipping bits, shifting masks, and learning visual binary algorithms.
        </p>
      </div>

      {/* CONTROLS BAR: WIDTH & SIGNED */}
      <div 
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          background: "var(--ifm-color-emphasis-100, #f8fafc)",
          border: "1px solid var(--ifm-color-emphasis-200)",
          padding: "12px 18px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, marginRight: "4px" }}>Register Size:</span>
          {[8, 16].map((w) => (
            <button
              key={w}
              onClick={() => {
                setBitWidth(w as 8 | 16);
                setActiveRecipe("");
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                background: bitWidth === w ? "var(--ifm-color-primary, #6366f1)" : "var(--ifm-color-emphasis-200, #cbd5e1)",
                color: bitWidth === w ? "#ffffff" : "var(--ifm-font-color-base)",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {w}-Bit
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, marginRight: "4px" }}>Signed Mode:</span>
          <button
            onClick={() => {
              setIsSigned(!isSigned);
              setActiveRecipe("");
            }}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background: isSigned ? "#f43f5e" : "var(--ifm-color-emphasis-200, #cbd5e1)",
              color: isSigned ? "#ffffff" : "var(--ifm-font-color-base)",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {isSigned ? "2's Complement (Signed)" : "Unsigned"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
        
        {/* LEFT COLUMN: INTERACTIVE REGISTERS & OPERATORS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: "1 1 500px", maxWidth: "560px" }}>
          
          {/* OPERAND A REGISTER */}
          <div 
            style={{
              background: isDark ? "#1e293b" : "#ffffff",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#10b981" }}>Operand A</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ifm-color-emphasis-500)" }}>DEC:</span>
                  <input
                    type="number"
                    value={operandA}
                    onChange={(e) => handleDecimalChange("A", e.target.value)}
                    style={{
                      width: "65px",
                      padding: "4px 6px",
                      borderRadius: "6px",
                      border: "1px solid var(--ifm-color-emphasis-300)",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ifm-color-emphasis-500)" }}>HEX:</span>
                  <input
                    type="text"
                    value={(operandA < 0 ? (1 << bitWidth) + operandA : operandA).toString(16).toUpperCase()}
                    onChange={(e) => handleHexChange("A", e.target.value)}
                    style={{
                      width: "55px",
                      padding: "4px 6px",
                      borderRadius: "6px",
                      border: "1px solid var(--ifm-color-emphasis-300)",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* A Binary Grid */}
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${bitWidth === 8 ? 8 : 8}, 1fr)`,
                gap: "6px",
              }}
            >
              {bitsA.map((bit, idx) => {
                const bitPower = bitWidth - 1 - idx;
                const isActiveIndex = currentStep?.columnIndex === idx;
                const tileBg = bit === 1 
                  ? "#10b981" 
                  : (isDark ? "#334155" : "#e2e8f0");
                const tileBorder = isActiveIndex 
                  ? "2px solid #6366f1" 
                  : "1px solid var(--ifm-color-emphasis-300)";

                return (
                  <div
                    key={idx}
                    onClick={() => handleBitClick("A", idx)}
                    style={{
                      background: tileBg,
                      border: tileBorder,
                      borderRadius: "8px",
                      aspectRatio: "1/1.2",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 2px",
                      cursor: "pointer",
                      userSelect: "none",
                      boxShadow: bit === 1 ? "0 0 8px rgba(16, 185, 129, 0.4)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: "0.6rem", fontWeight: 800, opacity: 0.6, color: bit === 1 ? "#ffffff" : "inherit" }}>
                      2^{bitPower}
                    </span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 900, color: bit === 1 ? "#ffffff" : "var(--ifm-font-color-base)" }}>
                      {bit}
                    </span>
                    <span style={{ fontSize: "0.55rem", fontWeight: 700, opacity: 0.5, color: bit === 1 ? "#ffffff" : "inherit" }}>
                      {1 << bitPower}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OPERATOR PANEL */}
          <div 
            style={{
              background: isDark ? "#1e293b" : "#ffffff",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <span style={{ fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", color: "var(--ifm-color-emphasis-500)" }}>Operator</span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["&", "|", "^", "~", "<<", ">>"].map((op) => (
                <button
                  key={op}
                  onClick={() => {
                    setOperator(op);
                    setActiveRecipe("");
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "none",
                    background: operator === op ? "var(--ifm-color-primary, #6366f1)" : "var(--ifm-color-emphasis-200, #cbd5e1)",
                    color: operator === op ? "#ffffff" : "var(--ifm-font-color-base)",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    flex: "1 0 45px",
                    transition: "all 0.15s ease",
                  }}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Conditional Parameters: shift amount */}
            {(operator === "<<" || operator === ">>") && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>Shift Bits:</span>
                <input
                  type="range"
                  min={1}
                  max={bitWidth === 8 ? 7 : 15}
                  value={shiftAmount}
                  onChange={(e) => setShiftAmount(Number(e.target.value))}
                  style={{ flexGrow: 1, accentColor: "var(--ifm-color-primary)" }}
                />
                <span style={{ fontSize: "0.85rem", fontWeight: 800, minWidth: "20px" }}>{shiftAmount}</span>
              </div>
            )}
          </div>

          {/* OPERAND B REGISTER (Hidden for Unary NOT) */}
          {operator !== "~" && (
            <div 
              style={{
                background: isDark ? "#1e293b" : "#ffffff",
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#6366f1" }}>
                  Operand B {(operator === "<<" || operator === ">>") && "(Shift Mask)"}
                </span>
                
                {!(operator === "<<" || operator === ">>") && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ifm-color-emphasis-500)" }}>DEC:</span>
                      <input
                        type="number"
                        value={operandB}
                        onChange={(e) => handleDecimalChange("B", e.target.value)}
                        style={{
                          width: "65px",
                          padding: "4px 6px",
                          borderRadius: "6px",
                          border: "1px solid var(--ifm-color-emphasis-300)",
                          fontSize: "0.8rem",
                          fontWeight: "bold"
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ifm-color-emphasis-500)" }}>HEX:</span>
                      <input
                        type="text"
                        value={(operandB < 0 ? (1 << bitWidth) + operandB : operandB).toString(16).toUpperCase()}
                        onChange={(e) => handleHexChange("B", e.target.value)}
                        style={{
                          width: "55px",
                          padding: "4px 6px",
                          borderRadius: "6px",
                          border: "1px solid var(--ifm-color-emphasis-300)",
                          fontSize: "0.8rem",
                          fontWeight: "bold"
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* B Binary Grid */}
              <div 
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${bitWidth === 8 ? 8 : 8}, 1fr)`,
                  gap: "6px",
                }}
              >
                {bitsB.map((bit, idx) => {
                  const bitPower = bitWidth - 1 - idx;
                  const isActiveIndex = currentStep?.columnIndex === idx;
                  const tileBg = bit === 1 
                    ? "#6366f1" 
                    : (isDark ? "#334155" : "#e2e8f0");
                  const tileBorder = isActiveIndex 
                    ? "2px solid #6366f1" 
                    : "1px solid var(--ifm-color-emphasis-300)";

                  return (
                    <div
                      key={idx}
                      onClick={() => !(operator === "<<" || operator === ">>") && handleBitClick("B", idx)}
                      style={{
                        background: tileBg,
                        border: tileBorder,
                        borderRadius: "8px",
                        aspectRatio: "1/1.2",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "6px 2px",
                        cursor: (operator === "<<" || operator === ">>") ? "default" : "pointer",
                        userSelect: "none",
                        boxShadow: bit === 1 ? "0 0 8px rgba(99, 102, 241, 0.4)" : "none",
                        transition: "all 0.15s ease",
                        opacity: (operator === "<<" || operator === ">>") ? 0.75 : 1,
                      }}
                    >
                      <span style={{ fontSize: "0.6rem", fontWeight: 800, opacity: 0.6, color: bit === 1 ? "#ffffff" : "inherit" }}>
                        2^{bitPower}
                      </span>
                      <span style={{ fontSize: "1.2rem", fontWeight: 900, color: bit === 1 ? "#ffffff" : "var(--ifm-font-color-base)" }}>
                        {bit}
                      </span>
                      <span style={{ fontSize: "0.55rem", fontWeight: 700, opacity: 0.5, color: bit === 1 ? "#ffffff" : "inherit" }}>
                        {1 << bitPower}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PLAYBACK CONTROLS FOR COLUMN SCANS */}
          <div 
            style={{
              background: "var(--ifm-color-emphasis-100, #f8fafc)",
              border: "1px solid var(--ifm-color-emphasis-200)",
              padding: "12px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {/* Timeline slider */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ifm-color-emphasis-600)", minWidth: "40px" }}>
                Step {stepIndex}
              </span>
              <input
                type="range"
                min={0}
                max={steps.length - 1}
                value={stepIndex}
                onChange={(e) => {
                  setStepIndex(Number(e.target.value));
                  setIsPlaying(false);
                }}
                style={{ flexGrow: 1, accentColor: "var(--ifm-color-primary)" }}
              />
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ifm-color-emphasis-600)", minWidth: "40px", textAlign: "right" }}>
                Total {steps.length - 1}
              </span>
            </div>

            {/* Play/Pause Buttons */}
            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--ifm-color-emphasis-300)",
                  background: "#ffffff",
                  color: "#000000",
                  cursor: "pointer",
                }}
                title="Reset Simulation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => {
                  setStepIndex((prev) => Math.max(0, prev - 1));
                  setIsPlaying(false);
                }}
                disabled={stepIndex === 0}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--ifm-color-emphasis-300)",
                  background: "#ffffff",
                  color: "#000000",
                  cursor: "pointer",
                  opacity: stepIndex === 0 ? 0.5 : 1,
                }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  padding: "6px 18px",
                  borderRadius: "6px",
                  border: "none",
                  background: isPlaying ? "var(--ifm-color-warning)" : "var(--ifm-color-primary)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8rem",
                }}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => {
                  setStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
                  setIsPlaying(false);
                }}
                disabled={steps.length === 0 || stepIndex === steps.length - 1}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--ifm-color-emphasis-300)",
                  background: "#ffffff",
                  color: "#000000",
                  cursor: "pointer",
                  opacity: (steps.length === 0 || stepIndex === steps.length - 1) ? 0.5 : 1,
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVALUATION RESULT & RECIPES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: "1 1 450px", maxWidth: "560px" }}>
          
          {/* RUNNING RESULT PANELS */}
          <div 
            style={{
              background: isDark ? "#0f172a" : "#1e293b",
              color: "#cbd5e1",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
            }}
          >
            <span style={{ fontWeight: 800, fontSize: "0.8rem", color: "#38bdf8", textTransform: "uppercase" }}>
              Calculation Trace Output
            </span>

            {/* Stacked visualization aligning A, B, and Result */}
            <div 
              style={{
                fontFamily: "var(--ifm-font-family-monospace, Courier, monospace)",
                fontSize: "0.85rem",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
            >
              {/* Row A */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: "60px", fontWeight: "bold" }}>A:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {bitsA.map((bit, idx) => (
                    <span 
                      key={idx}
                      style={{ 
                        padding: "2px 5px",
                        borderRadius: "3px",
                        background: currentStep?.columnIndex === idx ? "rgba(99, 102, 241, 0.3)" : "transparent",
                        border: currentStep?.columnIndex === idx ? "1px solid #6366f1" : "1px solid transparent",
                        color: bit === 1 ? "#10b981" : "inherit"
                      }}
                    >
                      {bit}
                    </span>
                  ))}
                </div>
                <span style={{ width: "60px", textAlign: "right" }}>({operandA})</span>
              </div>

              {/* Operator and B */}
              {operator !== "~" && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ width: "60px", fontWeight: "bold" }}>B ({operator}):</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {bitsB.map((bit, idx) => (
                      <span 
                        key={idx}
                        style={{ 
                          padding: "2px 5px",
                          borderRadius: "3px",
                          background: currentStep?.columnIndex === idx ? "rgba(99, 102, 241, 0.3)" : "transparent",
                          border: currentStep?.columnIndex === idx ? "1px solid #6366f1" : "1px solid transparent",
                          color: bit === 1 ? "#6366f1" : "inherit"
                        }}
                      >
                        {bit}
                      </span>
                    ))}
                  </div>
                  <span style={{ width: "60px", textAlign: "right" }}>
                    ({operator === "<<" || operator === ">>" ? shiftAmount : operandB})
                  </span>
                </div>
              )}

              {/* Separator line */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "4px 0" }} />

              {/* Result Row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#38bdf8" }}>
                <span style={{ width: "60px", fontWeight: "bold" }}>Result:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {runningResultBits.map((bit, idx) => {
                    const hasComputed = currentStep ? (idx >= currentStep.columnIndex && currentStep.columnIndex !== -1) || currentStep.columnIndex === 99 : false;
                    
                    return (
                      <span 
                        key={idx}
                        style={{ 
                          padding: "2px 5px",
                          borderRadius: "3px",
                          background: currentStep?.columnIndex === idx ? "rgba(56, 189, 248, 0.3)" : "transparent",
                          border: currentStep?.columnIndex === idx ? "1px solid #38bdf8" : "1px solid transparent",
                          color: bit === 1 ? "#38bdf8" : "inherit",
                          opacity: hasComputed ? 1 : 0.25,
                        }}
                      >
                        {bit}
                      </span>
                    );
                  })}
                </div>
                <span style={{ width: "60px", textAlign: "right", fontWeight: "bold" }}>
                  ({currentStep ? currentStep.resultVal : 0})
                </span>
              </div>
            </div>

            {/* Explanation box */}
            <div 
              style={{
                marginTop: "16px",
                padding: "10px 14px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                fontSize: "0.8rem",
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
                lineHeight: "1.5"
              }}
            >
              <Info size={14} color="#38bdf8" style={{ marginTop: "2px", flexShrink: 0 }} />
              <span>{currentStep ? currentStep.explanation : ""}</span>
            </div>
          </div>

          {/* BIT HACKS AND RECIPES */}
          <div 
            style={{
              background: isDark ? "#1e293b" : "#ffffff",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <BookOpen size={18} color="#6366f1" />
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>Useful Bit Hacks & Recipes</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "220px", overflowY: "auto", paddingRight: "4px" }}>
              {BIT_RECIPES.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => applyRecipe(recipe)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: activeRecipe === recipe.id ? "2px solid #6366f1" : "1px solid var(--ifm-color-emphasis-200)",
                    background: activeRecipe === recipe.id ? "rgba(99, 102, 241, 0.05)" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{recipe.name}</span>
                    <code style={{ fontSize: "0.7rem", color: "#6366f1", background: "rgba(99, 102, 241, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                      {recipe.expression}
                    </code>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--ifm-color-emphasis-600)", lineHeight: "1.4" }}>
                    {recipe.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected recipe explanation */}
            {activeRecipe && (
              <div 
                style={{
                  marginTop: "12px",
                  padding: "10px 12px",
                  background: "var(--ifm-color-emphasis-100, #f8fafc)",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  border: "1px solid var(--ifm-color-emphasis-300)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", fontWeight: "bold" }}>
                  <Flame size={14} color="#f43f5e" />
                  <span>How it works:</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {BIT_RECIPES.find((r) => r.id === activeRecipe)?.explanationSteps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}

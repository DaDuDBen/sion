import { motion } from "framer-motion";

export default function HeroSection() {
  // =========================
  // 🔧 QUICK ADJUST CONTROLS
  // =========================

  // Layout spacing (change these numbers to adjust spacing instantly)
  const SECTION_PADDING_X = "px-10"; // overall left-right padding of the hero section
  const GRID_GAP = "gap-16"; // space between left block and right block (try gap-10, gap-20)
  const LEFT_BLOCK_OFFSET_Y = "mt-0"; // move left text block down/up (try mt-6 or -mt-4)
  const RIGHT_BLOCK_OFFSET_Y = "mt-0"; // move right text block down/up (try mt-6 or -mt-4)

  // Alignment control (MOST IMPORTANT for you)
  // Change these to control where each block sits
  const LEFT_BLOCK_ALIGN = "items-start"; // items-start | items-center | items-end
  const RIGHT_BLOCK_ALIGN = "items-start"; // items-start | items-center | items-end

  // Text alignment control (controls the actual text alignment inside blocks)
  const LEFT_TEXT_ALIGN = "text-left"; // text-left | text-center | text-right
  const RIGHT_TEXT_ALIGN = "text-right"; // text-left | text-center | text-right

  // Font sizes (NUMBER-STYLE CONTROL)
  // use text-[Npx] so you can set EXACT values
  const PRICE_SIZE = "text-[100px]"; // ✅ price bigger (try 92px, 100px)
  const PRICE_SIZE_MOBILE = "text-[60px]"; // price size on mobile
  const SUBTITLE_SIZE = "text-[20px]"; // "No subscription"
  const SUBTITLE_SIZE_MOBILE = "text-[30px]";

  const RIGHT_LINE1_SIZE = "text-[84px]"; // "2X Faster..."
  const RIGHT_LINE1_SIZE_MOBILE = "text-[60px]";
  const RIGHT_LINE2_SIZE = "text-[74px]"; // "1/10 the cost..."
  const RIGHT_LINE2_SIZE_MOBILE = "text-[35px]";

  // Fine spacing inside each block
  const LEFT_TITLE_MARGIN_BOTTOM = "mb-0"; // spacing under price
  const RIGHT_LINE_GAP = "gap-5"; // spacing between right side lines

  // Move blocks horizontally with padding
  const LEFT_BLOCK_PADDING_LEFT = "pl-0"; // move left block right (try pl-6, pl-12)
  const RIGHT_BLOCK_PADDING_RIGHT = "pr-0"; // move right block left (try pr-6, pr-12)

  return (
    <section className={`relative h-screen w-full overflow-hidden flex items-center justify-center bg-black`}>
      
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#000000",
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 122, 24, 0.05) 0%, transparent 55%),
            radial-gradient(circle at 80% 80%, rgba(255, 122, 24, 0.035) 0%, transparent 55%)
          `
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Main container */}
      <div className={`relative z-10 max-w-7xl mx-auto w-full ${SECTION_PADDING_X}`}>
        
        {/* Grid controls alignment between both halves */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${GRID_GAP} items-center`}>
          
          {/* ========================= */}
          {/* LEFT SIDE (Price) */}
          {/* ========================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`
              flex flex-col ${LEFT_BLOCK_ALIGN} 
              ${LEFT_TEXT_ALIGN} 
              ${LEFT_BLOCK_OFFSET_Y}
              ${LEFT_BLOCK_PADDING_LEFT}
            `}
          >
            <h1
              className={`
                font-semibold text-[#F5F5F7] leading-[0.95]
                ${PRICE_SIZE_MOBILE} md:${PRICE_SIZE}
                ${LEFT_TITLE_MARGIN_BOTTOM}
              `}
            >
              ₹0.9 per Prescription
            </h1>

            <p
              className={`
                font-medium text-[#F5F5F7]/80
                ${SUBTITLE_SIZE_MOBILE} md:${SUBTITLE_SIZE}
              `}
            >
              No subscription
            </p>
          </motion.div>

          {/* ========================= */}
          {/* RIGHT SIDE (Claims) */}
          {/* ========================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`
              flex flex-col ${RIGHT_BLOCK_ALIGN}
              ${RIGHT_TEXT_ALIGN}
              ${RIGHT_BLOCK_OFFSET_Y}
              ${RIGHT_BLOCK_PADDING_RIGHT}
              ${RIGHT_LINE_GAP}
            `}
          >
            <p
              className={`
                font-medium text-white leading-[1.05]
                ${RIGHT_LINE1_SIZE_MOBILE} md:${RIGHT_LINE1_SIZE}
              `}
              style={{
                textShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
              }}
            >
              5X Faster than typing
            </p>

            <p
              className={`
                font-medium text-white leading-[1.05]
                ${RIGHT_LINE2_SIZE_MOBILE} md:${RIGHT_LINE2_SIZE}
              `}
              style={{
                textShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
              }}
            >
             No prescription is billed until late 2027
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

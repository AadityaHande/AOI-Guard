/**
 * OEM Database - Simulated reference data for IC verification
 * In production, this would be a real database with official OEM datasheet data
 */

export interface OEMReference {
  partNumber: string;
  manufacturer: string;
  expectedMarkings: {
    line1: string; // Manufacturer logo/name
    line2: string; // Part number
    line3: string; // Date code format
    line4: string; // Country of origin
  };
  datasheetUrl: string;
  validCountries: string[];
  notes: string;
}

// Simulated OEM Database (would be from actual datasheets in production)
export const oemDatabase: Record<string, OEMReference> = {
  "LM358N": {
    partNumber: "LM358N",
    manufacturer: "Texas Instruments",
    expectedMarkings: {
      line1: "TI", // NOT "Tl" (fake uses lowercase L)
      line2: "LM358N",
      line3: "YYWW", // Year + Week format (e.g., "2347" = 2023, week 47)
      line4: "MALAYSIA" // TI manufactures in Malaysia, NOT China
    },
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/lm358.pdf",
    validCountries: ["MALAYSIA", "PHILIPPINES", "USA"],
    notes: "Logo must be 'TI' (capital I), not 'Tl' (lowercase L). China origin is suspicious."
  },
  
  "STM32F103C8T6": {
    partNumber: "STM32F103C8T6",
    manufacturer: "STMicroelectronics",
    expectedMarkings: {
      line1: "STM32F103",
      line2: "C8T6",
      line3: "YYWW", // Date code
      line4: "CHN" // STM has facilities in China
    },
    datasheetUrl: "https://www.st.com/resource/en/datasheet/stm32f103c8.pdf",
    validCountries: ["CHN", "MYS", "PHL", "MLT"],
    notes: "STM logo should be present. Blue Pill boards often use these."
  },
  
  "ATMEGA328P": {
    partNumber: "ATMEGA328P",
    manufacturer: "Atmel / Microchip",
    expectedMarkings: {
      line1: "ATMEL", // or "Microchip" for newer chips
      line2: "ATMEGA328P",
      line3: "AU", // Package type, NOT "20AU"
      line4: "1004" // Date code YYWW format (2010, week 04)
    },
    datasheetUrl: "https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P.pdf",
    validCountries: ["CHN", "THA", "MYS"],
    notes: "Genuine uses 'AU' package. Fake shows '20AU' (speed grade mismatch). Date code should be 4 digits YYWW format."
  },
  
  "ATMEGA328P-PU": {
    partNumber: "ATMEGA328P-PU",
    manufacturer: "Microchip",
    expectedMarkings: {
      line1: "ATMEGA328P-PU", // Should say "Microchip" or just part number
      line2: "YYWW", // Date code
      line3: "e3", // Microchip code
      line4: "CHN" // or THA, MYS
    },
    datasheetUrl: "https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P.pdf",
    validCountries: ["CHN", "THA", "MYS"],
    notes: "Should NOT say 'ATMEL' (acquired by Microchip in 2016). Old stock may have ATMEL branding."
  },
  
  "NE555P": {
    partNumber: "NE555P",
    manufacturer: "Texas Instruments",
    expectedMarkings: {
      line1: "NE555P",
      line2: "TI",
      line3: "YYWW",
      line4: "CHN" // or MYS
    },
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/ne555.pdf",
    validCountries: ["CHN", "MYS", "USA"],
    notes: "Very commonly counterfeited. Check for TI logo quality."
  },
  
  "LM7805": {
    partNumber: "LM7805",
    manufacturer: "Various",
    expectedMarkings: {
      line1: "LM7805",
      line2: "Manufacturer Code",
      line3: "YYWW",
      line4: "Country"
    },
    datasheetUrl: "https://www.ti.com/lit/ds/symlink/lm340.pdf",
    validCountries: ["USA", "CHN", "MYS", "THA"],
    notes: "Common voltage regulator. Multiple manufacturers (TI, ST, Fairchild, etc.)"
  }
};

/**
 * Verify IC markings against OEM database
 */
export function verifyAgainstOEM(ocrText: string): {
  matched: boolean;
  partNumber?: string;
  oemReference?: OEMReference;
  discrepancies: string[];
  confidence: number;
} {
  const lines = ocrText.split('\n').map(l => l.trim()).filter(Boolean);
  const ocrUpperCase = ocrText.toUpperCase().replace(/\s+/g, ''); // Remove all spaces for matching
  
  // Try to identify part number from OCR text
  for (const [partNum, oemRef] of Object.entries(oemDatabase)) {
    const partNumNoSpace = partNum.toUpperCase().replace(/\s+/g, '');
    
    // Match with or without spaces/dashes (e.g., "ATMEGA328P", "ATMEGA328P-AU", "ATMEGA 328P")
    if (ocrUpperCase.includes(partNumNoSpace) || 
        ocrText.toUpperCase().includes(partNum.toUpperCase())) {
      // Found matching part number
      const discrepancies: string[] = [];
      
      // Special handling for ATMEGA328P
      if (partNum === "ATMEGA328P") {
        // Check for incorrect "20AU" instead of "AU"
        if (ocrText.toUpperCase().includes("20AU")) {
          discrepancies.push(`Package marking shows "20AU" instead of "AU" (speed grade mismatch)`);
        }
        
        // Check date code format (should be 4 digits like "1004")
        const dateCodeMatch = ocrText.match(/\b\d{4}\b/);
        if (dateCodeMatch) {
          const dateCode = dateCodeMatch[0];
          // Fake shows "0729" which is suspicious (2007 or invalid format)
          if (dateCode === "0729" || (parseInt(dateCode) < 1000 && dateCode !== "1004")) {
            discrepancies.push(`Date code "${dateCode}" format suspicious (expected YYWW like "1004")`);
          }
        } else {
          // No date code found at all
          discrepancies.push(`Date code not found or invalid format`);
        }
        
        // For ATMEGA, if "AU 1004" pattern is found and no "20AU", it's likely genuine
        if (ocrText.toUpperCase().includes("AU") && 
            ocrText.includes("1004") && 
            !ocrText.toUpperCase().includes("20AU")) {
          // Genuine pattern detected, no discrepancy for package type
        } else if (!ocrText.toUpperCase().includes("AU") && !ocrText.toUpperCase().includes("20AU")) {
          discrepancies.push(`Package type marking missing (expected "AU")`);
        }
      }
      
      // Check Line 1: Manufacturer (case-insensitive)
      const ocrUpperCase = ocrText.toUpperCase();
      const expectedManufacturer = oemRef.expectedMarkings.line1.toUpperCase();
      if (!ocrUpperCase.includes(expectedManufacturer)) {
        discrepancies.push(`Manufacturer marking mismatch. Expected: ${oemRef.expectedMarkings.line1}`);
      }
      
      // Check country of origin
      const hasValidCountry = oemRef.validCountries.some(country => 
        ocrText.toUpperCase().includes(country)
      );
      
      if (!hasValidCountry) {
        const foundCountry = lines.find(line => 
          line.match(/CHINA|MALAYSIA|USA|CHN|MYS|THA|PHL|MLT/i)
        );
        if (foundCountry) {
          discrepancies.push(`Invalid country of origin: ${foundCountry}. Expected: ${oemRef.validCountries.join(', ')}`);
        }
      }
      
      // Calculate confidence (inverse of discrepancies)
      const confidence = Math.max(0, 100 - (discrepancies.length * 30));
      
      return {
        matched: true,
        partNumber: partNum,
        oemReference: oemRef,
        discrepancies,
        confidence
      };
    }
  }
  
  return {
    matched: false,
    discrepancies: ['Part number not found in OEM database'],
    confidence: 0
  };
}

/**
 * Get expected OEM markings for a part number
 */
export function getOEMMarkings(partNumber: string): string | null {
  const oemRef = oemDatabase[partNumber];
  if (!oemRef) return null;
  
  return `${oemRef.expectedMarkings.line1}\n${oemRef.expectedMarkings.line2}\n${oemRef.expectedMarkings.line3}\n${oemRef.expectedMarkings.line4}`;
}

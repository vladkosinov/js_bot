var cherow = (function (exports) {
  'use strict';

  function create(source, onComment, onToken) {
      return {
          source,
          onComment,
          onToken,
          flags: 0,
          grammar: 3,
          index: 0,
          line: 1,
          column: 0,
          startIndex: 0,
          endIndex: 0,
          startLine: 1,
          endLine: 0,
          endColumn: 0,
          startColumn: 0,
          token: 536870912,
          tokenValue: undefined,
          tokenRaw: '',
          tokenRegExp: undefined,
          lastRegExpError: undefined,
          numCapturingParens: 0,
          largestBackReference: 0,
          length: source.length,
          currentChar: source.charCodeAt(0),
          lastChar: 0,
          assignable: true,
          bindable: true,
          exportedNames: [],
          exportedBindings: [],
          labelSet: undefined,
          labelSetStack: [],
          iterationStack: [],
          labelDepth: 0,
          switchStatement: 0,
          iterationStatement: 0,
          functionBoundaryStack: undefined,
          pendingCoverInitializeError: null
      };
  }

  const KeywordDescTable = [
      'end of source',
      'identifier',
      'number',
      'string',
      'regular expression',
      'false',
      'true',
      'null',
      'template continuation',
      'template end',
      '=>',
      '(',
      '{',
      '.',
      '...',
      '}',
      ')',
      ';',
      ',',
      '[',
      ']',
      ':',
      '?',
      '\'',
      '"',
      '</',
      '/>',
      '++',
      '--',
      '=',
      '<<=',
      '>>=',
      '>>>=',
      '**=',
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
      '^=',
      '|=',
      '&=',
      'typeof',
      'delete',
      'void',
      '!',
      '~',
      '+',
      '-',
      'in',
      'instanceof',
      '*',
      '%',
      '/',
      '**',
      '&&',
      '||',
      '===',
      '!==',
      '==',
      '!=',
      '<=',
      '>=',
      '<',
      '>',
      '<<',
      '>>',
      '>>>',
      '&',
      '|',
      '^',
      'var',
      'let',
      'const',
      'break',
      'case',
      'catch',
      'class',
      'continue',
      'debugger',
      'default',
      'do',
      'else',
      'export',
      'extends',
      'finally',
      'for',
      'function',
      'if',
      'import',
      'new',
      'return',
      'super',
      'switch',
      'this',
      'throw',
      'try',
      'while',
      'with',
      'implements',
      'interface',
      'package',
      'private',
      'protected',
      'public',
      'static',
      'yield',
      'as',
      'async',
      'await',
      'constructor',
      'get',
      'set',
      'from',
      'of',
      'enum',
      '@',
      'BigInt',
      'JSXText',
      '#',
      'global',
      'escaped keyword',
      'escaped keyword',
  ];
  const descKeywordTable = Object.create(null, {
      this: { value: 151646 },
      function: { value: 151639 },
      if: { value: 20568 },
      return: { value: 20571 },
      var: { value: 268587079 },
      else: { value: 20562 },
      for: { value: 20566 },
      new: { value: 151642 },
      in: { value: 33707825 },
      typeof: { value: 33706026 },
      while: { value: 20577 },
      case: { value: 20555 },
      break: { value: 20554 },
      try: { value: 20576 },
      catch: { value: 20556 },
      delete: { value: 33706027 },
      throw: { value: 151647 },
      switch: { value: 151645 },
      continue: { value: 20558 },
      default: { value: 20560 },
      instanceof: { value: 16930610 },
      do: { value: 20561 },
      void: { value: 33706028 },
      finally: { value: 20565 },
      async: { value: 1060972 },
      await: { value: 667757 },
      class: { value: 151629 },
      const: { value: 402804809 },
      constructor: { value: 12398 },
      debugger: { value: 20559 },
      export: { value: 20563 },
      extends: { value: 20564 },
      false: { value: 151557 },
      from: { value: 12401 },
      get: { value: 12399 },
      implements: { value: 36963 },
      import: { value: 151641 },
      interface: { value: 36964 },
      let: { value: 402821192 },
      null: { value: 151559 },
      of: { value: 12402 },
      package: { value: 36965 },
      private: { value: 36966 },
      protected: { value: 36967 },
      public: { value: 36968 },
      set: { value: 12400 },
      static: { value: 36969 },
      super: { value: 151644 },
      true: { value: 151558 },
      with: { value: 20578 },
      yield: { value: 2265194 },
      as: { value: 16920683 }
  });

  const unicodeLookup = ((compressed, lookup) => {
      const result = new Uint32Array(104448);
      let index = 0;
      let subIndex = 0;
      while (index < 3460) {
          const inst = compressed[index++];
          if (inst < 0) {
              subIndex -= inst;
          }
          else {
              let code = compressed[index++];
              if (inst & 2)
                  code = lookup[code];
              if (inst & 1) {
                  result.fill(code, subIndex, subIndex += compressed[index++]);
              }
              else {
                  result[subIndex++] = code;
              }
          }
      }
      return result;
  })([-1, 2, 27, 2, 28, 2, 5, -1, 0, 77595648, 3, 46, 2, 3, 0, 14, 2, 57, 2, 58, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 59, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 16, 2, 60, 2, 0, 0, 4294836735, 0, 3221225471, 0, 4294901942, 2, 61, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 0, 608174079, 2, 0, 2, 128, 2, 6, 2, 62, -1, 2, 64, 2, 25, 2, 1, 3, 0, 3, 0, 4294901711, 2, 41, 0, 4089839103, 0, 2961209759, 0, 1342439375, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 192, 0, 4294828031, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 69, 0, 4284449919, 0, 851904, 2, 4, 2, 11, 0, 67076095, -1, 2, 70, 0, 1073741743, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 35, 0, 4294844415, 0, 4278190047, 2, 22, 2, 126, -1, 3, 0, 2, 2, 32, 2, 0, 2, 9, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 72, 2, 0, 2, 73, 2, 74, 2, 75, 2, 0, 2, 76, 2, 0, 2, 10, 0, 261632, 2, 19, 3, 0, 2, 2, 12, 2, 4, 3, 0, 18, 2, 77, 2, 5, 3, 0, 2, 2, 78, 0, 2088959, 2, 30, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 43, 0, 67057664, 3, 0, 2, 2, 42, 2, 0, 2, 31, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 29, 2, 51, 2, 0, 2, 79, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 44, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 52, 0, 4294960127, 2, 9, 2, 40, 2, 10, 0, 4294377472, 2, 11, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 12, 2, 0, 2, 81, 2, 9, 2, 0, 2, 82, 2, 83, 2, 84, -1, 2, 122, 0, 1048577, 2, 85, 2, 13, -1, 2, 13, 0, 131042, 2, 86, 2, 87, 2, 88, 2, 0, 2, 36, -83, 2, 0, 2, 54, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 14, 2, 0, 0, 2147516671, 2, 23, 3, 89, 2, 2, 0, -16, 2, 90, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 15, 2, 80, 2, 16, 3, 0, 2, 2, 49, 2, 11, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 71, -1, 2, 17, 2, 9, 3, 0, 8, 2, 92, 2, 119, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 21, 2, 93, 3, 0, 2, 2, 94, 2, 0, 2, 95, 2, 21, 2, 0, 2, 26, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 3909091327, 2, 0, 2, 24, 2, 8, 2, 22, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 23, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 98, 2, 99, 2, 15, 2, 33, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 100, 2, 101, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 34, -1, 0, 3774349439, 2, 102, 2, 103, 3, 0, 2, 2, 20, 2, 25, 3, 0, 10, 2, 9, 2, 17, 2, 0, 2, 47, 2, 0, 2, 26, 2, 104, 2, 19, 0, 1638399, 2, 172, 2, 105, 3, 0, 3, 2, 22, 2, 27, 2, 28, 2, 5, 2, 29, 2, 0, 2, 7, 2, 106, -1, 2, 107, 2, 108, 2, 109, -1, 3, 0, 3, 2, 11, -2, 2, 0, 2, 30, -3, 2, 150, -4, 2, 22, 2, 0, 2, 38, 0, 1, 2, 0, 2, 63, 2, 31, 2, 11, 2, 9, 2, 0, 2, 110, -1, 3, 0, 4, 2, 9, 2, 32, 2, 111, 2, 6, 2, 0, 2, 33, 2, 0, 2, 50, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 112, 2, 113, 2, 18, 2, 23, 2, 7, -2, 2, 114, 2, 18, 2, 34, -2, 2, 0, 2, 115, -2, 0, 4277137519, 0, 2269118463, -1, 3, 22, 2, -1, 2, 35, 2, 39, 2, 0, 3, 18, 2, 2, 37, 2, 20, -3, 3, 0, 2, 2, 36, -1, 2, 0, 2, 37, 2, 0, 2, 37, 2, 0, 2, 48, -14, 2, 22, 2, 45, 2, 38, -4, 2, 23, 3, 0, 2, 2, 39, 0, 2147549120, 2, 0, 2, 11, 2, 17, 2, 134, 2, 0, 2, 53, 0, 4294901872, 0, 5242879, 3, 0, 2, 0, 402595359, -1, 2, 118, 0, 1090519039, -2, 2, 120, 2, 40, 2, 0, 0, 67045375, 2, 41, 0, 4226678271, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 0, 3288270847, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 42, 2, 43, -1, 2, 10, 2, 44, -6, 2, 0, 2, 11, -3, 3, 0, 2, 0, 2147484671, -5, 2, 123, 0, 4244635647, 0, 27, 2, 0, 2, 7, 2, 45, 2, 0, 2, 65, -1, 2, 0, 2, 42, -8, 2, 55, 2, 46, 0, 67043329, 2, 124, 2, 47, 0, 8388351, -2, 2, 125, 0, 3028287487, 2, 48, 2, 127, 0, 33259519, 2, 43, -9, 2, 23, -8, 3, 0, 28, 2, 34, -3, 3, 0, 3, 2, 49, 3, 0, 6, 2, 50, -85, 3, 0, 33, 2, 49, -126, 3, 0, 18, 2, 39, -269, 3, 0, 17, 2, 42, 2, 7, 2, 43, -2, 2, 17, 2, 51, 2, 0, 2, 23, 0, 67043343, 2, 129, 2, 19, -21, 3, 0, 2, -4, 3, 0, 2, 0, 4294936575, 2, 0, 0, 4294934783, -2, 2, 130, 3, 0, 191, 2, 52, 3, 0, 23, 2, 37, -296, 3, 0, 8, 2, 7, -1, 2, 131, 2, 132, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 133, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 53, 2, 0, 2, 135, 2, 136, 2, 56, 2, 0, 2, 137, 2, 138, 2, 139, 3, 0, 10, 2, 140, 2, 141, 2, 15, 3, 53, 2, 3, 54, 2, 3, 55, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 91, 2, 0, 0, 2105343, 0, 4160749584, 0, 65534, -42, 0, 4194303871, 0, 2011, -6, 2, 0, 0, 1073684479, 0, 17407, -11, 2, 0, 2, 34, -40, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 44, -37, 2, 56, 2, 144, 2, 145, 2, 146, 2, 147, 2, 148, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 30, 3, 0, 6, 2, 9, 3, 0, 180, 2, 149, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 9, -22583, 3, 0, 7, 2, 19, -6130, 3, 5, 2, -1, 0, 69207040, 3, 46, 2, 3, 0, 14, 2, 57, 2, 58, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 59, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 16, 2, 60, 2, 0, 2, 36, -1, 2, 17, 2, 61, -1, 2, 0, 2, 62, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 19, 2, 63, 3, 0, 2, 0, 131135, 2, 96, 0, 70256639, 0, 71303167, 0, 272, 2, 42, 2, 62, -1, 2, 64, -2, 2, 97, 2, 65, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 66, 2, 67, 0, 33554435, 2, 121, 2, 66, 2, 151, 0, 131075, 0, 3594373096, 0, 67094296, 2, 67, -1, 2, 68, 0, 603979263, 2, 160, 0, 3, 0, 4294828001, 0, 602930687, 2, 181, 0, 393219, 2, 68, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 69, 2, 39, -1, 2, 4, 0, 917503, 2, 39, -1, 2, 70, 0, 537788335, 0, 4026531935, -1, 0, 1, -1, 2, 35, 2, 71, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 72, 2, 0, 2, 73, 2, 74, 2, 75, 2, 0, 2, 76, 2, 0, 2, 11, -1, 2, 19, 3, 0, 2, 2, 12, 2, 4, 3, 0, 18, 2, 77, 2, 5, 3, 0, 2, 2, 78, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 42, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 51, 2, 0, 2, 79, 2, 43, -1, 2, 23, 2, 0, 2, 30, -2, 0, 128, -2, 2, 80, 2, 8, 0, 4064, -1, 2, 117, 0, 4227907585, 2, 0, 2, 116, 2, 0, 2, 50, 0, 4227915776, 2, 9, 2, 40, 2, 10, -1, 0, 74440192, 3, 0, 6, -2, 3, 0, 8, 2, 12, 2, 0, 2, 81, 2, 9, 2, 0, 2, 82, 2, 83, 2, 84, -3, 2, 85, 2, 13, -3, 2, 86, 2, 87, 2, 88, 2, 0, 2, 36, -83, 2, 0, 2, 54, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 14, 2, 0, 0, 33023, 2, 23, 3, 89, 2, -17, 2, 90, 0, 524157950, 2, 4, 2, 0, 2, 91, 2, 4, 2, 0, 2, 15, 2, 80, 2, 16, 3, 0, 2, 2, 49, 2, 11, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 71, -1, 2, 17, 2, 9, 3, 0, 8, 2, 92, 0, 3072, 2, 0, 0, 2147516415, 2, 9, 3, 0, 2, 2, 19, 2, 21, 2, 93, 3, 0, 2, 2, 94, 2, 0, 2, 95, 2, 21, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 93, 2, 8, -1, 0, 1761345536, 2, 96, 0, 4294901823, 2, 39, 2, 22, 2, 97, 2, 37, 2, 165, 0, 2080440287, 2, 0, 2, 36, 2, 142, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 98, 2, 99, 2, 15, 2, 33, 3, 0, 3, 0, 7, 3, 0, 349, 2, 100, 2, 101, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 34, -1, 0, 2700607615, 2, 102, 2, 103, 3, 0, 2, 2, 20, 2, 25, 3, 0, 10, 2, 9, 2, 17, 2, 0, 2, 47, 2, 0, 2, 26, 2, 104, -3, 2, 105, 3, 0, 3, 2, 22, -1, 3, 5, 2, 2, 29, 2, 0, 2, 7, 2, 106, -1, 2, 107, 2, 108, 2, 109, -1, 3, 0, 3, 2, 11, -2, 2, 0, 2, 30, -8, 2, 22, 2, 0, 2, 38, -1, 2, 0, 2, 63, 2, 31, 2, 18, 2, 9, 2, 0, 2, 110, -1, 3, 0, 4, 2, 9, 2, 17, 2, 111, 2, 6, 2, 0, 2, 33, 2, 0, 2, 50, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 112, 2, 113, 2, 18, 2, 23, 2, 7, -2, 2, 114, 2, 18, 2, 34, -2, 2, 0, 2, 115, -2, 0, 4277075969, 2, 18, -1, 3, 22, 2, -1, 2, 35, 2, 143, 2, 0, 3, 18, 2, 2, 37, 2, 20, -3, 3, 0, 2, 2, 36, -1, 2, 0, 2, 37, 2, 0, 2, 37, 2, 0, 2, 50, -14, 2, 22, 2, 45, 2, 116, -4, 2, 23, 2, 117, 2, 52, -2, 2, 117, 2, 19, 2, 17, 2, 36, 2, 117, 2, 39, 0, 4294901776, 0, 4718591, 2, 117, 2, 37, 0, 335544350, -1, 2, 118, 2, 119, -2, 2, 120, 2, 40, 2, 7, -1, 2, 121, 2, 66, 0, 3758161920, 0, 3, -4, 2, 0, 2, 30, 0, 2147485568, -1, 2, 0, 2, 19, 0, 176, -5, 2, 0, 2, 49, 2, 183, -1, 2, 0, 2, 19, 2, 195, -1, 2, 0, 0, 16779263, -2, 2, 11, -7, 2, 0, 2, 119, -3, 3, 0, 2, 2, 122, -5, 2, 123, 2, 38, 0, 10, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 536871935, -1, 2, 0, 2, 42, -8, 2, 55, 2, 49, 0, 1, 2, 124, 2, 19, -3, 2, 125, 2, 38, 2, 126, 2, 127, 0, 16778239, -10, 2, 37, -8, 3, 0, 28, 2, 34, -3, 3, 0, 3, 2, 49, 3, 0, 6, 2, 50, -85, 3, 0, 33, 2, 49, -126, 3, 0, 18, 2, 39, -269, 3, 0, 17, 2, 42, 2, 7, -3, 2, 17, 2, 128, 2, 0, 2, 19, 2, 50, 2, 129, 2, 19, -21, 3, 0, 2, -4, 3, 0, 2, 0, 67583, -1, 2, 25, -2, 2, 130, 3, 0, 191, 2, 52, 3, 0, 23, 2, 37, -296, 3, 0, 8, 2, 7, -1, 2, 131, 2, 132, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 133, 2, 134, -187, 3, 0, 2, 2, 53, 2, 0, 2, 135, 2, 136, 2, 56, 2, 0, 2, 137, 2, 138, 2, 139, 3, 0, 10, 2, 140, 2, 141, 2, 15, 3, 53, 2, 3, 54, 2, 3, 55, 2, 2, 142, -73, 2, 0, 0, 1065361407, 0, 16384, -11, 2, 0, 2, 119, -40, 3, 0, 6, 2, 143, -1, 3, 0, 2, 0, 2063, -37, 2, 56, 2, 144, 2, 145, 2, 146, 2, 147, 2, 148, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 30, 3, 0, 6, 2, 9, 3, 0, 180, 2, 149, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 9, -28719, 2, 0, 0, 1, -1, 2, 122, 2, 0, 0, 8193, -21, 2, 191, 0, 10255, 0, 4, -11, 2, 67, 2, 170, -1, 0, 71680, -1, 2, 161, 0, 4292900864, 0, 805306431, -5, 2, 150, -1, 2, 177, -1, 2, 200, -2, 2, 124, -1, 2, 154, -1, 2, 157, 2, 151, 2, 164, 2, 0, 0, 3223322624, 2, 37, 0, 4, -4, 2, 189, 0, 205128192, 0, 1333757536, 0, 2147483696, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4286578751, 0, 278545, 2, 152, 0, 4294886464, 0, 33292336, 0, 417809, 2, 152, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 153, 0, 469762560, 0, 4171219488, 0, 8323120, 2, 153, 0, 202375680, 0, 3214918176, 0, 4294508592, 0, 139280, -1, 0, 983584, 0, 48, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 176, 2, 0, 0, 2089, 0, 3221225552, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 150, 0, 4160757760, 2, 0, -6, 2, 166, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 2, 154, 2, 159, 2, 178, -2, 2, 162, -20, 0, 3758096385, -2, 2, 155, 0, 4292878336, 2, 21, 2, 168, 0, 4294057984, -2, 2, 163, 2, 156, 2, 174, -2, 2, 155, -1, 2, 180, -1, 2, 169, 2, 122, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 158, 0, 939588608, -1, 0, 805306368, -1, 2, 122, 0, 1610612736, 2, 156, 2, 157, 3, 0, 2, -2, 2, 158, 2, 159, -3, 0, 267386880, -1, 2, 160, 0, 7168, -1, 0, 65024, 2, 154, 2, 161, 2, 171, -7, 2, 167, -8, 2, 162, -1, 0, 1426112704, 2, 163, -1, 2, 186, 0, 271581216, 0, 2149777408, 2, 19, 2, 161, 2, 122, 0, 851967, 0, 3758129152, -1, 2, 19, 2, 179, -4, 2, 158, -20, 2, 193, 2, 164, -56, 0, 3145728, 2, 185, -4, 2, 165, 2, 122, -4, 0, 32505856, -1, 2, 166, -1, 0, 2147385088, 2, 21, 1, 2155905152, 2, -3, 2, 17, 2, 0, 2, 167, -2, 2, 168, -6, 2, 169, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 170, -3, 2, 143, 2, 67, -2, 2, 165, 2, 171, -1, 2, 175, 2, 122, -6, 2, 122, -213, 2, 169, -657, 2, 17, -36, 2, 172, -1, 2, 187, -10, 2, 198, -5, 2, 173, -6, 0, 4294967171, 2, 23, -1, 0, 4227919872, -1, 2, 173, -2, 0, 4227874752, -3, 0, 2146435072, 2, 159, -2, 0, 1006649344, 2, 122, -1, 2, 21, 0, 201375744, -3, 0, 134217720, 2, 21, 0, 4286677377, 0, 32896, -1, 2, 161, -3, 2, 174, -349, 2, 175, 0, 1920, 2, 176, 3, 0, 264, -11, 2, 177, -2, 2, 178, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 19, -1, 2, 184, -1, 2, 182, 0, 3221291007, 2, 178, -1, 0, 524288, 0, 2158720, -3, 2, 159, 0, 1, -4, 2, 122, 0, 3808625411, 0, 3489628288, 2, 199, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 171, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 19, 2, 163, 3, 0, 4, 2, 159, -1, 2, 179, 2, 176, -1, 0, 8176, 2, 180, 2, 171, 2, 181, -1, 0, 4290773232, 2, 0, -4, 2, 163, 2, 188, 0, 15728640, 2, 176, -1, 2, 161, -1, 0, 4294934512, 3, 0, 4, -9, 2, 21, 2, 169, 2, 182, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 122, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 2, 197, 3, 0, 2, -1, 2, 183, 2, 184, -1, 0, 17829776, 0, 2025848832, 0, 4261477888, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 185, 0, 16252928, 0, 3791388672, 2, 40, 3, 0, 2, -2, 2, 194, 2, 0, -1, 2, 25, -1, 0, 66584576, -1, 2, 190, 3, 0, 9, 2, 122, 3, 0, 4, -1, 2, 161, 2, 178, 3, 0, 4, 2, 21, -2, 0, 245760, 0, 2147418112, -1, 2, 150, 2, 202, 0, 4227923456, -1, 2, 186, 2, 187, 2, 21, -2, 2, 177, 0, 4292870145, 0, 262144, 2, 122, 3, 0, 2, 0, 1073758848, 2, 188, -1, 0, 4227921920, 2, 189, 0, 68289024, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 335544320, 2, 0, -2, 2, 190, 3, 0, 5, -1, 2, 185, 2, 163, 2, 0, -2, 0, 4227923936, 2, 63, -1, 2, 155, 2, 96, 2, 0, 2, 154, 2, 158, 3, 0, 6, -1, 2, 176, 3, 0, 3, -2, 0, 2146959360, 3, 0, 5, 0, 768, 2, 191, 2, 80, -2, 2, 161, -2, 2, 117, -1, 2, 155, 3, 0, 8, 0, 512, 0, 8388608, 2, 192, 2, 172, 2, 184, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 190, 0, 576, 0, 4261707776, 2, 96, 3, 0, 9, 2, 155, 3, 0, 6, -1, 0, 2147221504, -28, 2, 178, 3, 0, 3, -3, 0, 4292902912, -6, 2, 97, 3, 0, 85, -33, 0, 4294934528, 3, 0, 126, -18, 2, 193, 3, 0, 269, -17, 2, 155, 2, 122, 2, 196, 3, 0, 2, 2, 19, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 21, -2, 2, 171, 3, 0, 3, -2, 0, 30720, -1, 0, 32512, 3, 0, 2, 2, 97, -191, 2, 173, -23, 2, 25, 3, 0, 296, -8, 2, 122, 2, 0, 0, 4294508543, 0, 65295, -11, 2, 176, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 169, -1, 0, 384, -1, 0, 133693440, -3, 2, 194, -2, 2, 29, 3, 0, 4, 2, 168, -2, 2, 21, 2, 155, 3, 0, 4, -2, 2, 186, -1, 2, 150, 0, 335552923, 2, 195, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 6, -1, 0, 3221282816, 2, 196, 3, 0, 11, -1, 2, 197, 3, 0, 40, -6, 0, 4286578784, 2, 0, -2, 0, 1006694400, 3, 0, 24, 2, 38, -1, 2, 201, 3, 0, 2, 0, 1, 2, 163, 3, 0, 6, 2, 195, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 47, 3, 0, 8, -1, 2, 158, -2, 2, 168, 0, 98304, 0, 65537, 2, 169, 2, 172, -2, 2, 172, -1, 2, 63, 2, 0, 2, 116, 0, 65528, 2, 176, 0, 4294770176, 2, 29, 3, 0, 4, -30, 2, 169, 0, 4160806912, -3, 2, 168, -2, 2, 155, 2, 198, 2, 158, -1, 2, 190, -1, 2, 161, 0, 4294950912, 3, 0, 2, 2, 199, -2, 0, 58982400, -1, 0, 14360, 2, 200, -3, 2, 168, 0, 4176527360, 0, 4290838520, 3, 0, 43, -1334, 2, 21, 2, 0, -129, 2, 201, -6, 2, 163, -180, 2, 202, -233, 2, 4, 3, 0, 96, -16, 2, 163, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 1073741823, 3892314111, 134217727, 1061158911, 536805376, 4294910143, 4160749567, 4294901759, 4294901760, 4194303, 65535, 262143, 4286578688, 536870911, 8388607, 4294918143, 4294443008, 255, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294902015, 67108863, 4294967039, 511, 524287, 131071, 127, 4294902271, 4294549487, 33554431, 1023, 67047423, 4294901888, 4286578687, 4294770687, 67043583, 32767, 15, 2047999, 16777215, 4292870143, 4294934527, 4294966783, 4294967279, 262083, 20511, 4290772991, 41943039, 493567, 2047, 4294959104, 1071644671, 603979775, 602799615, 65536, 4294828000, 805044223, 4294965206, 8191, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294909951, 4294967292, 4294965759, 124, 4294966272, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 4128527, 4279238655, 4294966591, 2445279231, 3670015, 3238002687, 63, 4294967288, 4294705151, 4095, 3221208447, 4294549472, 2147483648, 4294966527, 4294705152, 4294966143, 64, 4294966719, 16383, 3774873592, 11, 458752, 4294902000, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139264, 402653184, 4261412864, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 3233808384, 3221225472, 4294965248, 32768, 57152, 67108864, 4293918720, 4290772992, 25165824, 4160749568, 57344, 4278190080, 4227907584, 65520, 4026531840, 49152, 4227858432, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 2097152, 65408, 64512, 417808, 4227923712, 50331648, 65472, 4294967168, 4294966784, 16, 4294917120, 2080374784, 4294963200, 4096, 6144, 4292870144, 65532]);

  const AsciiLookup = new Uint8Array(0x80)
      .fill(3, 0x24, 0x25)
      .fill(4, 0x30, 0x3a)
      .fill(3, 0x41, 0x5b)
      .fill(3, 0x5f, 0x60)
      .fill(3, 0x61, 0x7b);
  function isIdentifierPart(code) {
      return (AsciiLookup[code] & 1) > 0 || ((unicodeLookup[(code >>> 5) + 0] >>> code) & 31 & 1) > 0;
  }
  function isIdentifierStart(code) {
      return (AsciiLookup[code] & 2) > 0 || ((unicodeLookup[(code >>> 5) + 34816] >>> code) & 31 & 1) > 0;
  }

  const errorMessages = {
      [0]: 'Unexpected token',
      [2]: 'Nothing to repeat',
      [3]: '\\ at end of pattern',
      [4]: 'Invalid property name',
      [5]: 'Invalid decimal escape',
      [6]: 'Back references can not have more two or more consecutive numbers',
      [7]: 'Invalid named reference',
      [8]: 'Invalid regular expression',
      [9]: 'Invalid Escape',
      [10]: 'Invalid unicode Escape',
      [11]: 'Range out of order in character class',
      [12]: 'Invalid character class',
      [13]: 'Invalid extended unicode escape',
      [14]: "Already declared group name '%0'",
      [15]: "Duplicate regular expression flag '%0'",
      [16]: 'Unterminated MultiLineComment',
      [17]: 'HTML comments are not allowed in modules',
      [18]: "Illegal character '%0'",
      [23]: 'Unterminated string literal',
      [24]: 'Unterminated template literal',
      [22]: 'Octal escapes are not allowed in strict mode',
      [21]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
      [20]: 'Invalid hexadecimal escape sequence',
      [19]: 'Unicode codepoint must not be greater than 0x10FFFF',
      [25]: 'Missing exponent',
      [27]: 'Invalid BigIntLiteral',
      [26]: 'Identifier starts immediately after numeric literal',
      [28]: 'Expected number in radix %0',
      [29]: 'Legacy octal literals are not allowed in strict mode',
      [30]: "Identifier '%0' has already been declared",
      [34]: "Duplicate binding '%0'",
      [31]: "The `catch` var '%0' can't be redefined",
      [33]: 'In strict mode code, functions can only be declared at top level or inside a block',
      [121]: 'Without web compability enabled functions can not be declared at top level, inside a block, or as the body of an if statement',
      [32]: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
      [35]: "let can't be a variable name in strict mode",
      [36]: "Exported binding '%0' is not declared",
      [37]: "Exported binding '%0' has already been declared",
      [38]: 'Const must be initialized',
      [43]: 'Illegal newline after throw',
      [44]: 'Illegal return statement',
      [39]: 'Illegal continue statement: no surrounding iteration statement',
      [40]: 'Illegal break statement',
      [42]: "Label '%0' has already been declared",
      [41]: 'Strict mode code may not include a with statement',
      [45]: 'Calling delete on expression not allowed in strict mode',
      [46]: 'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
      [47]: 'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass',
      [48]: 'Member access on super must be in a method',
      [1]: "Unexpected token '%0'",
      [49]: 'Duplicate constructor method in class',
      [50]: 'Function name may not be eval or arguments in strict mode',
      [51]: "Classes may not have a static property named 'prototype'",
      [52]: 'Class constructor may not be a %0',
      [53]: 'Unterminated regular expression',
      [54]: 'Unexpected regular expression flag',
      [55]: "'yield' is a reserved keyword within generator function bodies",
      [56]: "'%0' may not be used as an identifier in this context",
      [57]: "Can not use 'let' as a class name",
      [58]: 'Can not use `let` when binding through `let` or `const`',
      [59]: 'Can not use `let` as variable name in strict mode',
      [60]: 'Await is only valid in async functions',
      [61]: '`Static` is a reserved word in strict mode',
      [62]: ' Invalid use of reserved word as a variable name in strict mode',
      [63]: "%0 can't appear in single-statement context",
      [64]: 'Async functions can only be declared at the top level or inside a block',
      [65]: "Classes may not have a private field named '#constructor'",
      [66]: "Classes may not have a field named 'constructor'",
      [67]: "Classes may not have a static private property named '#prototype'",
      [68]: 'Async methods are a restricted production and can not have a newline following it',
      [69]: 'Only methods are allowed in classes',
      [70]: 'Private fields can not be deleted',
      [71]: 'Private fields can not be deleted',
      [71]: '%0 increment/decrement may not have eval or arguments operand in strict mode',
      [72]: 'Invalid left-hand side in assignment',
      [73]: 'Unexpected eval or arguments in strict mode',
      [74]: 'Unexpected strict mode reserved word',
      [75]: 'Invalid shorthand property initializer',
      [76]: 'Illegal arrow function parameter list',
      [77]: 'Left-hand side of the for-%0 loop must be assignable',
      [78]: 'Use of disabled experimental feature',
      [79]: 'A trailing comma is not permitted after the rest element ',
      [80]: 'Legacy octal literals are not allowed in strict mode',
      [81]: '%0 functions must have exactly %1 argument%2',
      [82]: 'Setter function argument must not be a rest parameter',
      [83]: '%0 statement must be nested within an iteration statement',
      [84]: '`let \n [` is a restricted production at the start of a statement',
      [85]: '%0 is already bound as a lexical binding',
      [86]: 'The lexical binding %0 has been bound multiple times',
      [88]: 'Can not use `let` or `const` with the same name as bound to a parameter',
      [87]: 'Double declaration of the same binding name in a `catch` var',
      [90]: 'Destructuring declarations %0 must have an initializer',
      [89]: "'for-%0' loop head declarations can not have an initializer",
      [91]: 'Invalid left-hand side in for-%0 loop: Must have a single binding.',
      [92]: 'Await expression not allowed in formal parameter',
      [93]: 'Yield expression not allowed in formal parameter',
      [94]: 'Only a identifier can be used to indicate alias',
      [95]: "'%0' export binding already bound",
      [108]: "'%0' binding already bound",
      [96]: "Only '*' or '{...}' can be imported after default",
      [97]: '%0 source must be string',
      [98]: 'The %0 keyword can only be used with the module goal',
      [99]: 'The identifier contained dynamic unicode escape that was not closed',
      [100]: 'The identifier escape did not yield a valid identifier character',
      [101]: 'Invalid codepoint value in the escape sequence',
      [102]: 'Invalid escaped keyword',
      [103]: "No line break is allowed after '%0'",
      [105]: "Illegal 'use strict' directive in function with non-simple parameter list",
      [107]: 'Duplicate formal parameter names not allowed with non-simnple arguments',
      [106]: 'Duplicate formal parameter names not allowed in strict mode',
      [104]: 'The left hand side of the arrow can only be destructed through assignment',
      [109]: 'The use of a future reserved word for an identifier is invalid. The identifier name is reserved in strict mode',
      [110]: 'The use of a keyword for an identifier is invalid',
      [111]: '%0 declaration must have a name in this context',
      [112]: 'Invalid usage of %0 in strict mode',
      [113]: 'Expected identifier',
      [114]: "'default' can only appear once in a 'switch' statement",
      [115]: 'Missing catch or finally after try',
      [116]: 'Invalid usage of `var` declaration for a name used in catch binding',
      [117]: 'Unexpected destructuring expression',
      [118]: 'Expected %0',
      [119]: 'Invalid destructuring assignment target',
      [120]: '`for await` only accepts the `for-of` type',
      [122]: 'Invalid use of %0 inside `new`',
      [123]: 'Template literals may not contain octal escape sequences'
  };
  function report(state, type, ...params) {
      const { index, line, column } = state;
      let message = errorMessages[type].replace(/%(\d+)/g, (_, i) => params[i]);
      message += ' (' + line + ':' + column + ')';
      let lines = state.source.split('\n');
      message = message + '\n' + lines[line - 1] + '\n';
      for (var i = 0; i < column; i++) {
          message += ' ';
      }
      message += '^\n';
      const error = new SyntaxError(message);
      error.index = index;
      error.line = line;
      error.column = column;
      error.description = message;
      throw error;
  }

  function scanNext(state, err) {
      state.index++;
      state.column++;
      if (state.index >= state.length)
          report(state, err);
      return state.source.charCodeAt(state.index);
  }
  function consumeOpt(state, code) {
      if (state.source.charCodeAt(state.index) !== code)
          return false;
      state.index++;
      state.column++;
      return true;
  }
  function consumeLineFeed(state, lastIsCR) {
      state.index++;
      if (!lastIsCR) {
          state.column = 0;
          state.line++;
      }
  }
  function fromCodePoint(code) {
      if (code > 0xffff) {
          return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
      }
      else {
          return String.fromCharCode(code);
      }
  }
  function toHex(code) {
      if (code < 48)
          return -1;
      if (code <= 57)
          return code - 48;
      if (code < 65)
          return -1;
      if (code <= 70)
          return code - 65 + 10;
      if (code < 97)
          return -1;
      if (code <= 102)
          return code - 97 + 10;
      return -1;
  }
  function isDigit(ch) {
      return ch >= 48 && ch <= 57;
  }
  function advanceOne(state) {
      state.index++;
      state.column++;
  }

  function scanIdentifierOrKeyword(state, context, first) {
      const { index, column } = state;
      while (isIdentifierPart((first = state.source.charCodeAt(state.index)))) {
          advanceOne(state);
      }
      state.tokenValue = state.source.slice(state.startIndex, state.index);
      if (state.index < state.length && first === 92) {
          state.index = index;
          state.column = column;
          return scanIdentifierRest(state, context);
      }
      const len = state.tokenValue.length;
      if (len >= 2 && len <= 11) {
          const keyword = descKeywordTable[state.tokenValue];
          if (keyword !== undefined)
              return keyword;
      }
      if (context & 8)
          state.tokenRaw = state.source.slice(state.startIndex, state.index);
      return 405505;
  }
  function scanIdentifier(state, context, first) {
      const { index, column } = state;
      while (isIdentifierPart((first = state.source.charCodeAt(state.index)))) {
          advanceOne(state);
      }
      state.tokenValue = state.source.slice(state.startIndex, state.index);
      if (state.index < state.length && first === 92) {
          state.index = index;
          state.column = column;
          return scanIdentifierRest(state, context);
      }
      if (context & 8)
          state.tokenRaw = state.source.slice(state.startIndex, state.index);
      return 405505;
  }
  function scanMaybeIdentifier(state, _, first) {
      switch (first) {
          case 160:
          case 5760:
          case 8192:
          case 8193:
          case 8194:
          case 8195:
          case 8196:
          case 8197:
          case 8198:
          case 8199:
          case 8200:
          case 8201:
          case 8202:
          case 8239:
          case 8287:
          case 12288:
          case 8205:
          case 8204:
              advanceOne(state);
              return 1073741824;
          case 8232:
          case 8233:
              state.flags = (state.flags & ~2) | 1;
              ++state.index;
              state.column = 0;
              ++state.line;
              return 1073741824;
      }
      if (state.index < state.length && first >= 0xd800 && 0xdbff <= 0xdbff) {
          const lo = state.source.charCodeAt(state.index);
          if (lo >= 0xdc00 && lo <= 0xdfff) {
              first = ((first & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
              ++state.index;
          }
          ++state.column;
          state.tokenValue = state.source.slice(state.startIndex, state.index);
          return 405505;
      }
      report(state, 18, String.fromCharCode(first));
  }
  function scanPrivateName(state, _) {
      advanceOne(state);
      const start = state.index;
      if (!isIdentifierStart(state.source.charCodeAt(state.index))) {
          report(state, 1, fromCodePoint(state.source.charCodeAt(state.index)));
      }
      while (isIdentifierStart(state.source.charCodeAt(state.index))) {
          advanceOne(state);
      }
      state.tokenValue = state.source.slice(start, state.index);
      return 119;
  }
  function nextIdentifierChar(state) {
      let hi = state.source.charCodeAt(state.index);
      if (hi >= 0xd800 && hi <= 0xdbff) {
          let lo = state.source.charCodeAt(state.index + 1);
          if ((lo & 0xfc00) === 0xdc00) {
              hi = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
              ++state.index;
          }
          ++state.column;
      }
      return hi;
  }
  function scanIdentifierRest(state, context) {
      let hasEscape = false;
      let result = '';
      let start = state.index;
      while (state.index < state.length) {
          let ch = nextIdentifierChar(state);
          if (isIdentifierPart(ch)) {
              advanceOne(state);
          }
          else if ((ch & 8) === 8 && ch === 92) {
              hasEscape = true;
              result += state.source.substring(start, state.index);
              const cookedChar = scanIdentifierUnicodeEscape(state);
              if (!isIdentifierPart(cookedChar))
                  report(state, 100);
              result += fromCodePoint(cookedChar);
              start = state.index;
          }
          else {
              break;
          }
      }
      state.tokenValue = result += state.source.substring(start, state.index);
      if (context & 8)
          state.tokenRaw = state.source.slice(state.startIndex, state.index);
      const len = state.tokenValue.length;
      if (len >= 2 && len <= 11) {
          const keyword = descKeywordTable[state.tokenValue];
          if (keyword !== undefined) {
              return !hasEscape || keyword === 405505
                  ? keyword
                  : keyword & (2097152 | 1048576)
                      ? 121
                      : (keyword & 36864) === 36864
                          ? hasEscape
                              ? 126
                              : keyword
                          : context & 1024 && (keyword === 36969 || keyword === 402821192)
                              ? 126
                              : 121;
          }
      }
      return 405505;
  }
  function scanIdentifierUnicodeEscape(state) {
      advanceOne(state);
      if (state.source.charCodeAt(state.index) !== 117)
          report(state, 101);
      advanceOne(state);
      return scanUnicodeEscape(state);
  }
  function scanUnicodeEscape(state) {
      let ch = state.source.charCodeAt(state.index++);
      let value = 0;
      if (ch === 123) {
          value = toHex(state.source.charCodeAt(state.index++));
          if (value < 0 || state.index === state.length)
              return report(state, 100);
          ch = state.source.charCodeAt(state.index++);
          while (ch !== 125) {
              const digit = toHex(ch);
              if (digit < 0)
                  return report(state, 100);
              value = (value << 4) | digit;
              if (value > 0x10ffff)
                  report(state, 19);
              ch = state.source.charCodeAt(state.index++);
          }
          if (value < 0 || ch !== 125)
              report(state, 99);
      }
      else {
          value = toHex(ch);
          if (value < 0)
              report(state, 100);
          for (let i = 0; i < 3; i++) {
              if (state.index === state.length)
                  report(state, 10);
              ch = state.source.charCodeAt(state.index++);
              const digit = toHex(ch);
              if (digit < 0)
                  report(state, 100);
              value = (value << 4) | digit;
          }
      }
      state.column = state.index;
      return value;
  }

  function returnBigIntOrNumericToken(state) {
      if (state.source.charCodeAt(state.index) === 110) {
          if (state.flags & 4)
              report(state, 27);
          advanceOne(state);
          return 116;
      }
      else {
          if ((state.flags & (16 | 8)) === 0)
              state.tokenValue = +state.tokenValue;
          return 131074;
      }
  }
  function scanNumeric(state, context, first) {
      state.tokenValue = 0;
      let digit = 9;
      do {
          state.tokenValue = 10 * state.tokenValue + (first - 48);
          advanceOne(state);
          --digit;
      } while (isDigit((first = state.source.charCodeAt(state.index))));
      if (digit >= 0 && state.index < state.length && first !== 46 && !isIdentifierStart(first)) {
          if (context & 8)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          return returnBigIntOrNumericToken(state);
      }
      if (first === 46) {
          advanceOne(state);
          state.flags = 4;
          while (isDigit((first = state.source.charCodeAt(state.index)))) {
              advanceOne(state);
          }
      }
      if ((first | 32) === 101) {
          advanceOne(state);
          state.flags = 4;
          first = state.source.charCodeAt(state.index);
          if (first === 43 || first === 45) {
              first = state.source.charCodeAt(++state.index);
              ++state.column;
          }
          if (first >= 48 && first <= 57) {
              first = state.source.charCodeAt(++state.index);
              ++state.column;
              while (isDigit((first = state.source.charCodeAt(state.index)))) {
                  advanceOne(state);
              }
          }
          else
              report(state, 25);
      }
      if (first !== 110 && ((first >= 48 && first <= 57) || isIdentifierStart(first)))
          report(state, 26);
      state.tokenValue = state.source.slice(state.startIndex, state.index);
      if (context & 8)
          state.tokenRaw = state.tokenValue;
      return returnBigIntOrNumericToken(state);
  }
  function scanHexIntegerLiteral(state) {
      let ch = state.source.charCodeAt(state.index);
      let value = 0;
      let digit = toHex(ch);
      if (digit < 0)
          report(state, 0);
      while (digit >= 0) {
          value = value * 16 + digit;
          advanceOne(state);
          digit = toHex(state.source.charCodeAt(state.index));
      }
      state.tokenValue = value;
      return returnBigIntOrNumericToken(state);
  }
  function scanBinaryOrOctalDigits(state, base) {
      let value = 0;
      let numberOfDigits = 0;
      while (state.index < state.length) {
          const ch = state.source.charCodeAt(state.index);
          const converted = ch - 48;
          if (!(ch >= 48 && ch <= 57) || converted >= base)
              break;
          value = value * base + converted;
          advanceOne(state);
          numberOfDigits++;
      }
      if (numberOfDigits === 0)
          report(state, 28, '' + base);
      state.flags |= 16;
      state.tokenValue = value;
      return returnBigIntOrNumericToken(state);
  }
  function scanImplicitOctalDigits(state, context, first) {
      if ((context & 1024) !== 0)
          report(state, 29);
      let { index, column } = state;
      let code = 0;
      while (index < state.length) {
          const next = state.source.charCodeAt(index);
          if (next < 48 || next > 55) {
              state.flags |= 4;
              return scanNumeric(state, context, first);
          }
          else {
              code = code * 8 + (next - 48);
              index++;
              column++;
          }
      }
      state.flags |= 8;
      state.index = index;
      state.column = column;
      state.tokenValue = code;
      return 131074;
  }

  var RegexState;
  (function (RegexState) {
      RegexState[RegexState["Empty"] = 0] = "Empty";
      RegexState[RegexState["Escape"] = 1] = "Escape";
      RegexState[RegexState["Class"] = 2] = "Class";
  })(RegexState || (RegexState = {}));
  var RegexFlags;
  (function (RegexFlags) {
      RegexFlags[RegexFlags["Empty"] = 0] = "Empty";
      RegexFlags[RegexFlags["IgnoreCase"] = 1] = "IgnoreCase";
      RegexFlags[RegexFlags["Global"] = 2] = "Global";
      RegexFlags[RegexFlags["Multiline"] = 4] = "Multiline";
      RegexFlags[RegexFlags["Unicode"] = 8] = "Unicode";
      RegexFlags[RegexFlags["Sticky"] = 16] = "Sticky";
      RegexFlags[RegexFlags["DotAll"] = 32] = "DotAll";
  })(RegexFlags || (RegexFlags = {}));
  function scanRegularExpression(state, context) {
      const bodyStart = state.index;
      let preparseState = RegexState.Empty;
      loop: while (true) {
          const ch = state.source.charCodeAt(state.index);
          state.index++;
          state.column++;
          if (preparseState & RegexState.Escape) {
              preparseState &= ~RegexState.Escape;
          }
          else {
              switch (ch) {
                  case 47:
                      if (!preparseState)
                          break loop;
                      else
                          break;
                  case 92:
                      preparseState |= RegexState.Escape;
                      break;
                  case 91:
                      preparseState |= RegexState.Class;
                      break;
                  case 93:
                      preparseState &= RegexState.Escape;
                      break;
                  case 13:
                  case 10:
                  case 8232:
                  case 8233:
                      report(state, 53);
                  default:
              }
          }
          if (state.index >= state.source.length) {
              report(state, 53);
          }
      }
      const bodyEnd = state.index - 1;
      let mask = RegexFlags.Empty;
      const { index: flagStart } = state;
      loop: while (state.index < state.source.length) {
          const code = state.source.charCodeAt(state.index);
          switch (code) {
              case 103:
                  if (mask & RegexFlags.Global)
                      report(state, 15, 'g');
                  mask |= RegexFlags.Global;
                  break;
              case 105:
                  if (mask & RegexFlags.IgnoreCase)
                      report(state, 15, 'i');
                  mask |= RegexFlags.IgnoreCase;
                  break;
              case 109:
                  if (mask & RegexFlags.Multiline)
                      report(state, 15, 'm');
                  mask |= RegexFlags.Multiline;
                  break;
              case 117:
                  if (mask & RegexFlags.Unicode)
                      report(state, 15, 'u');
                  mask |= RegexFlags.Unicode;
                  break;
              case 121:
                  if (mask & RegexFlags.Sticky)
                      report(state, 15, 'y');
                  mask |= RegexFlags.Sticky;
                  break;
              case 115:
                  if (mask & RegexFlags.DotAll)
                      report(state, 15, 's');
                  mask |= RegexFlags.DotAll;
                  break;
              default:
                  if (!isIdentifierPart(code))
                      break loop;
                  report(state, 54, fromCodePoint(code));
          }
          state.index++;
          state.column++;
      }
      const flags = state.source.slice(flagStart, state.index);
      const pattern = state.source.slice(bodyStart, bodyEnd);
      state.tokenRegExp = { pattern, flags };
      if (context & 8)
          state.tokenRaw = state.source.slice(state.startIndex, state.index);
      state.tokenValue = validate(state, pattern, flags);
      return 131076;
  }
  function validate(state, pattern, flags) {
      try {
      }
      catch (e) {
          report(state, 53);
      }
      try {
          return new RegExp(pattern, flags);
      }
      catch (e) {
          return null;
      }
  }

  const CommentTypes = ['SingleLine', 'MultiLine', 'HTMLOpen', 'HTMLClose', 'HashbangComment'];
  function skipHashBang(state, context) {
      let index = state.index;
      if (index === state.source.length)
          return;
      if (state.source.charCodeAt(index) === 65519) {
          index++;
          state.index = index;
      }
      if (context & 1 && index < state.source.length && state.source.charCodeAt(index) === 35) {
          index++;
          if (index < state.source.length && state.source.charCodeAt(index) === 33) {
              state.index = index + 1;
              skipSingleLineComment(state, 4);
          }
          else {
              report(state, 0);
          }
      }
  }
  function skipSingleHTMLComment(state, context, type) {
      if (context & 2048)
          report(state, 17);
      return skipSingleLineComment(state, type);
  }
  function skipSingleLineComment(state, type) {
      const { index: start } = state;
      while (state.index < state.length) {
          const next = state.source.charCodeAt(state.index);
          if ((next & 8) === 8 && (next & 83) < 3) {
              if (next === 13) {
                  ++state.index;
                  state.column = 0;
                  ++state.line;
                  if (state.index < state.length && state.source.charCodeAt(state.index) === 10)
                      state.index++;
                  state.flags |= 1;
                  break;
              }
              else if (next === 10 || (next ^ 8233) <= 1) {
                  ++state.index;
                  state.column = 0;
                  ++state.line;
                  state.flags |= 1;
                  break;
              }
              else {
                  ++state.index;
                  ++state.column;
              }
          }
          else {
              ++state.index;
              ++state.column;
          }
      }
      if (state.onComment)
          state.onComment(CommentTypes[type & 0xff], state.source.slice(start, state.index), start, state.index);
      return 1073741824;
  }
  function skipBlockComment(state) {
      const { index: start } = state;
      while (state.index < state.length) {
          const next = state.source.charCodeAt(state.index);
          if (next === 42) {
              state.index++;
              state.column++;
              state.flags &= ~2;
              if (consumeOpt(state, 47)) {
                  if (state.onComment)
                      state.onComment(CommentTypes[1 & 0xff], state.source.slice(start, state.index - 2), start, state.index);
                  return 1073741824;
              }
          }
          else if ((next & 8) === 8) {
              if ((next & 83) < 3 && next === 13) {
                  state.flags |= 1 | 2;
                  state.index++;
                  state.column = 0;
                  state.line++;
              }
              else if (next === 10) {
                  consumeLineFeed(state, (state.flags & 2) !== 0);
                  state.flags = (state.flags & ~2) | 1;
              }
              else if ((next ^ 8233) <= 1) {
                  state.flags = (state.flags & ~2) | 1;
                  state.index++;
                  state.column = 0;
                  state.line++;
              }
              else {
                  state.flags &= ~2;
                  state.index++;
                  state.column++;
              }
          }
          else {
              state.flags &= ~2;
              state.index++;
              state.column++;
          }
      }
      return report(state, 16);
  }

  function scanStringLiteral(state, context, quote) {
      const { index: start, lastChar } = state;
      let ret = '';
      let ch = scanNext(state, 23);
      while (ch !== quote) {
          if (ch === 92) {
              ch = scanNext(state, 23);
              if (ch >= 128) {
                  ret += fromCodePoint(ch);
              }
              else {
                  state.lastChar = ch;
                  const code = table[ch](state, context, ch);
                  if (code >= 0)
                      ret += fromCodePoint(code);
                  else
                      reportInvalidEscapeError(state, code, false);
                  ch = state.lastChar;
              }
          }
          else if (((ch - 0xe) & 0x2000 && ch === 13) || ch === 10) {
              report(state, 0);
          }
          else
              ret += fromCodePoint(ch);
          ch = scanNext(state, 23);
      }
      advanceOne(state);
      if (context & 8)
          state.tokenRaw = state.source.slice(start, state.index);
      state.tokenValue = ret;
      state.lastChar = lastChar;
      return 131075;
  }
  const table = new Array(128).fill((state) => state.source.charCodeAt(state.index));
  table[98] = () => 8;
  table[102] = () => 12;
  table[114] = () => 13;
  table[110] = () => 10;
  table[116] = () => 9;
  table[118] = () => 11;
  table[13] = state => {
      state.column = -1;
      state.line++;
      const { index } = state;
      if (index < state.source.length) {
          const ch = state.source.charCodeAt(index);
          if (ch === 10) {
              state.lastChar = ch;
              state.index = index + 1;
          }
      }
      return -1;
  };
  table[10] = table[8232] = table[8233] = state => {
      state.column = -1;
      state.line++;
      return -1;
  };
  table[48] = table[49] = table[50] = table[51] = (state, context, first) => {
      let code = first - 48;
      let index = state.index + 1;
      let column = state.column + 1;
      if (index < state.source.length) {
          const next = state.source.charCodeAt(index);
          if (next < 48 || next > 55) {
              if (code !== 0 || next === 56 || next === 57) {
                  if (context & 1024)
                      return -2;
                  state.flags = state.flags | 8;
              }
          }
          else if (context & 1024) {
              return -2;
          }
          else {
              state.flags = state.flags | 8;
              state.lastChar = next;
              code = code * 8 + (next - 48);
              index++;
              column++;
              if (index < state.source.length) {
                  const next = state.source.charCodeAt(index);
                  if (next >= 48 && next <= 55) {
                      state.lastChar = next;
                      code = code * 8 + (next - 48);
                      index++;
                      column++;
                  }
              }
              state.index = index - 1;
              state.column = column - 1;
          }
      }
      return code;
  };
  table[52] = table[53] = table[54] = table[55] = (state, context, first) => {
      if (context & 1024)
          return -2;
      let code = first - 48;
      const index = state.index + 1;
      const column = state.column + 1;
      if (index < state.source.length) {
          const next = state.source.charCodeAt(index);
          if (next >= 48 && next <= 55) {
              code = code * 8 + (next - 48);
              state.lastChar = next;
              state.index = index;
              state.column = column;
          }
      }
      return code;
  };
  table[56] = table[57] = () => -3;
  table[120] = state => {
      const ch1 = (state.lastChar = scanNext(state, 20));
      const hi = toHex(ch1);
      if (hi < 0)
          return -4;
      const ch2 = (state.lastChar = scanNext(state, 20));
      const lo = toHex(ch2);
      if (lo < 0)
          return -4;
      return hi * 16 + lo;
  };
  table[117] = state => {
      let ch = (state.lastChar = scanNext(state, 10));
      if (ch === 123) {
          ch = state.lastChar = scanNext(state, 10);
          let code = toHex(ch);
          if (code < 0)
              return -4;
          ch = state.lastChar = scanNext(state, 10);
          while (ch !== 125) {
              const digit = toHex(ch);
              if (digit < 0)
                  return -4;
              code = code * 16 + digit;
              if (code > 0x10fff)
                  return -5;
              ch = state.lastChar = scanNext(state, 10);
          }
          return code;
      }
      else {
          let code = toHex(ch);
          if (code < 0)
              return -4;
          for (let i = 0; i < 3; i++) {
              ch = state.lastChar = scanNext(state, 10);
              const digit = toHex(ch);
              if (digit < 0)
                  return -4;
              code = code * 16 + digit;
          }
          return code;
      }
  };
  function reportInvalidEscapeError(state, code, isTemplate) {
      switch (code) {
          case -2:
              report(state, isTemplate ? 123 : 22);
          case -3:
              report(state, 21);
          case -4:
              report(state, 20);
          case -5:
              report(state, 19);
          default:
              return;
      }
  }

  function scanTemplate(state, context) {
      const { index: start, lastChar } = state;
      let tail = true;
      let ret = '';
      let ch = scanNext(state, 24);
      while (ch !== 96) {
          if (ch === 36) {
              if (state.index + 1 < state.source.length && state.source.charCodeAt(state.index + 1) === 123) {
                  advanceOne(state);
                  tail = false;
                  break;
              }
              ret += '$';
          }
          else if (ch === 92) {
              ch = scanNext(state, 24);
              if (ch >= 128) {
                  ret += fromCodePoint(ch);
              }
              else {
                  state.lastChar = ch;
                  const code = table[ch](state, context | 1024, ch);
                  if (code >= 0) {
                      ret += fromCodePoint(code);
                  }
                  else if (code !== -1 && context & 65536) {
                      ret = undefined;
                      ch = scanLooserTemplateSegment(state, state.lastChar);
                      if (ch < 0) {
                          ch = -ch;
                          tail = false;
                      }
                      break;
                  }
                  else {
                      reportInvalidEscapeError(state, code, true);
                  }
                  ch = state.lastChar;
              }
          }
          else if ((ch - 0xe) & 0x2000) {
              if (ch === 13 || ch === 10 || (ch ^ 8233) <= 1) {
                  state.column = -1;
                  state.line++;
              }
              if (ret != null)
                  ret += fromCodePoint(ch);
          }
          else if (ret != null)
              ret += fromCodePoint(ch);
          ch = scanNext(state, 24);
      }
      advanceOne(state);
      state.tokenValue = ret;
      state.lastChar = lastChar;
      if (tail) {
          state.tokenRaw = state.source.slice(start + 1, state.index - 1);
          return 131081;
      }
      else {
          state.tokenRaw = state.source.slice(start + 1, state.index - 2);
          return 131080;
      }
  }
  function scanLooserTemplateSegment(state, ch) {
      while (ch !== 96) {
          if (ch === 36 && state.source.charCodeAt(state.index + 1) === 123) {
              state.index++;
              state.column++;
              return -ch;
          }
          ch = scanNext(state, 24);
      }
      return ch;
  }
  function scanTemplateTail(state, context) {
      if (state.index >= state.length)
          return report(state, 0);
      state.index--;
      state.column--;
      return scanTemplate(state, context);
  }

  const oneCharTokens = new Array(128).fill(0);
  const table$1 = new Array(0xffff).fill(scanMaybeIdentifier, 0x80);
  function scanChar(state, _, first) {
      advanceOne(state);
      return oneCharTokens[first];
  }
  table$1[44] = scanChar;
  oneCharTokens[44] = 18;
  table$1[63] = scanChar;
  oneCharTokens[63] = 22;
  for (let i = 65; i <= 90; i++) {
      table$1[i] = scanIdentifier;
  }
  for (let i = 97; i <= 122; i++) {
      table$1[i] = scanIdentifierOrKeyword;
  }
  table$1[91] = scanChar;
  oneCharTokens[91] = 131091;
  table$1[93] = scanChar;
  oneCharTokens[93] = 20;
  table$1[123] = scanChar;
  oneCharTokens[123] = 131084;
  table$1[125] = scanChar;
  oneCharTokens[125] = 536870927;
  table$1[126] = scanChar;
  oneCharTokens[126] = 33685550;
  table$1[40] = scanChar;
  oneCharTokens[40] = 131083;
  table$1[41] = scanChar;
  oneCharTokens[41] = 16;
  table$1[35] = scanPrivateName;
  table$1[36] = scanIdentifier;
  table$1[34] = scanStringLiteral;
  table$1[39] = scanStringLiteral;
  table$1[92] = scanIdentifierRest;
  table$1[95] = scanIdentifier;
  table$1[96] = scanTemplate;
  for (let i = 49; i <= 57; i++) {
      table$1[i] = scanNumeric;
  }
  table$1[58] = scanChar;
  oneCharTokens[58] = 21;
  table$1[59] = scanChar;
  oneCharTokens[59] = 536870929;
  table$1[33] = s => {
      advanceOne(s);
      if (!consumeOpt(s, 61))
          return 33685549;
      if (!consumeOpt(s, 61))
          return 16909884;
      return 16909882;
  };
  table$1[37] = s => {
      advanceOne(s);
      if (!consumeOpt(s, 61))
          return 16910900;
      return 8388646;
  };
  table$1[38] = s => {
      advanceOne(s);
      if (s.index >= s.length)
          return 16909636;
      const next = s.source.charCodeAt(s.index);
      if (next === 38) {
          advanceOne(s);
          return 16974391;
      }
      if (next === 61) {
          advanceOne(s);
          return 8388649;
      }
      return 16909636;
  };
  table$1[42] = s => {
      advanceOne(s);
      if (s.index >= s.length)
          return 21105203;
      const next = s.source.charCodeAt(s.index);
      if (next === 61) {
          advanceOne(s);
          return 8388644;
      }
      if (next !== 42)
          return 21105203;
      advanceOne(s);
      if (!consumeOpt(s, 61))
          return 16911158;
      return 8388641;
  };
  table$1[43] = s => {
      advanceOne(s);
      const next = s.source.charCodeAt(s.index);
      if (next === 43) {
          advanceOne(s);
          return 67239963;
      }
      if (next === 61) {
          advanceOne(s);
          return 8388642;
      }
      return 50465071;
  };
  table$1[45] = (state, context) => {
      advanceOne(state);
      if (state.index >= state.length)
          return 50465072;
      const next = state.source.charCodeAt(state.index);
      if (next === 45) {
          advanceOne(state);
          if (context & 16 &&
              ((state.flags & 1 || state.startIndex === 0) && consumeOpt(state, 62))) {
              return skipSingleHTMLComment(state, context, 3);
          }
          return 67239964;
      }
      else if (next === 61) {
          advanceOne(state);
          return 8388643;
      }
      return 50465072;
  };
  table$1[46] = (state, context, first) => {
      advanceOne(state);
      const next = state.source.charCodeAt(state.index);
      if (!isDigit(next)) {
          if (consumeOpt(state, 46)) {
              if (consumeOpt(state, 46))
                  return 14;
              state.column = state.index--;
          }
          return 13;
      }
      return scanNumeric(state, context, first);
  };
  table$1[47] = (state, context) => {
      advanceOne(state);
      if (state.index < state.length) {
          const next = state.source.charCodeAt(state.index);
          if (next === 47) {
              advanceOne(state);
              return skipSingleLineComment(state, 0);
          }
          else if (next === 42) {
              advanceOne(state);
              return skipBlockComment(state);
          }
          else if (context & 32768) {
              return scanRegularExpression(state, context);
          }
          else if (next === 61) {
              advanceOne(state);
              return 8519717;
          }
          else if (next === 62) {
              advanceOne(state);
              return 26;
          }
      }
      return 16910901;
  };
  table$1[60] = (state, context) => {
      advanceOne(state);
      if (state.index >= state.length)
          return 16910143;
      switch (state.source.charCodeAt(state.index)) {
          case 60:
              advanceOne(state);
              if (consumeOpt(state, 61)) {
                  return 8388638;
              }
              else {
                  return 16910401;
              }
          case 61:
              advanceOne(state);
              return 16910141;
          case 33: {
              const index = state.index + 1;
              const next = state.source.charCodeAt(index);
              if (next === 45 && state.source.charCodeAt(index + 1) === 45) {
                  state.index = index;
                  state.column++;
                  return skipSingleHTMLComment(state, context, 2);
              }
          }
          case 47: {
              if (!(context & 4))
                  break;
              const index = state.index + 1;
              if (index < state.source.length) {
                  const next = state.source.charCodeAt(index);
                  if (next === 42 || next === 47)
                      break;
              }
              advanceOne(state);
              return 25;
          }
          default:
      }
      return 16910143;
  };
  table$1[61] = s => {
      advanceOne(s);
      if (s.index >= s.length)
          return 8388637;
      const next = s.source.charCodeAt(s.index);
      if (next === 61) {
          advanceOne(s);
          return consumeOpt(s, 61) ? 16909881 : 16909883;
      }
      else if (next === 62) {
          advanceOne(s);
          return 131082;
      }
      return 8388637;
  };
  table$1[62] = state => {
      advanceOne(state);
      if (state.index >= state.length)
          return 16910144;
      const next = state.source.charCodeAt(state.index);
      if (next === 62) {
          advanceOne(state);
          if (state.index < state.length) {
              const next = state.source.charCodeAt(state.index);
              if (next === 62) {
                  advanceOne(state);
                  return consumeOpt(state, 61) ? 8388640 : 16910403;
              }
              else if (next === 61) {
                  advanceOne(state);
                  return 8388639;
              }
          }
          return 16910402;
      }
      else if (next === 61) {
          advanceOne(state);
          return 16910142;
      }
      return 16910144;
  };
  table$1[94] = s => {
      advanceOne(s);
      if (!consumeOpt(s, 61))
          return 16909382;
      return 8388647;
  };
  table$1[124] = s => {
      advanceOne(s);
      if (s.index >= s.length)
          return 16909125;
      const next = s.source.charCodeAt(s.index);
      if (next === 124) {
          advanceOne(s);
          return 16974136;
      }
      else if (next === 61) {
          advanceOne(s);
          return 8388648;
      }
      return 16909125;
  };
  table$1[48] = (state, context, first) => {
      const index = state.index + 1;
      if (index < state.length) {
          const next = state.source.charCodeAt(index);
          let lowerCasedLetters = next | 32;
          if (lowerCasedLetters === 120) {
              state.index = index + 1;
              state.column += 2;
              return scanHexIntegerLiteral(state);
          }
          else if (lowerCasedLetters === 98) {
              state.index = index + 1;
              state.column += 2;
              return scanBinaryOrOctalDigits(state, 2);
          }
          else if (lowerCasedLetters === 111) {
              state.index = index + 1;
              state.column += 2;
              return scanBinaryOrOctalDigits(state, 8);
          }
          else if (index < state.length && (next >= 48 && next <= 57)) {
              return scanImplicitOctalDigits(state, context, first);
          }
      }
      return scanNumeric(state, context, first);
  };
  table$1[32] = table$1[9] = table$1[12] = table$1[11] = state => {
      advanceOne(state);
      return 1073741824;
  };
  table$1[10] = state => {
      consumeLineFeed(state, (state.flags & 2) > 0);
      state.flags = (state.flags & ~2) | 1;
      return 1073741824;
  };
  table$1[13] = state => {
      state.flags |= 1 | 2;
      ++state.index;
      state.column = 0;
      ++state.line;
      return 1073741824;
  };
  function tableLookUp(state, context, first) {
      return table$1[first](state, context, first);
  }
  function scanSingleToken(state, context, scanSingleTokenAlternative) {
      state.flags &= ~1;
      state.endIndex = state.index;
      state.endLine = state.line;
      state.endColumn = state.column;
      const callBack = scanSingleTokenAlternative ? scanSingleTokenAlternative : tableLookUp;
      while (state.index < state.length) {
          state.startIndex = state.index;
          state.startColumn = state.column;
          state.startLine = state.line;
          const first = state.source.charCodeAt(state.index);
          if (((state.token = callBack(state, context, first)) & 1073741824) !== 1073741824) {
              if (state.onToken)
                  state.onToken(convertTokenType(state.token), state.startIndex, state.index);
              return state.token;
          }
      }
      return (state.token = 536870912);
  }

  function pushComment(context, array) {
      return function (type, value, start, end) {
          const comment = {
              type,
              value
          };
          if (context & 32) {
              comment.start = start;
              comment.end = end;
          }
          array.push(comment);
      };
  }
  function convertTokenType(t) {
      switch (t) {
          case 131074:
              return 'NumericLiteral';
          case 131075:
              return 'StringLiteral';
          case 131076:
              return 'RegularExpressionLiteral';
          case 151557:
          case 151558:
              return 'BooleanLiteral';
          case 151559:
              return 'NullLiteral';
          case 131076:
              return 'RegularExpression';
          case 131080:
          case 131081:
              return 'TemplateLiteral';
          default:
              if ((t & 274432) === 274432)
                  return 'Identifier';
              if ((t & 4096) === 4096)
                  return 'Keyword';
              return 'Punctuator';
      }
  }
  function pushToken(context, array) {
      return function (token, value, start, end) {
          const tokens = {
              token,
              value
          };
          if (context & 32) {
              tokens.start = start;
              tokens.end = end;
          }
          array.push(tokens);
      };
  }
  function finishNode(state, context, start, line, column, node) {
      if (context & 2) {
          node.start = start;
          node.end = state.endIndex;
      }
      if (context & 32) {
          node.loc = {
              start: { line, column },
              end: { line: state.endLine, column: state.endColumn }
          };
      }
      return node;
  }
  function optional(state, context, t) {
      if (state.token === t) {
          scanSingleToken(state, context);
          return true;
      }
      return false;
  }
  function expect(state, context, t) {
      if (state.token === t) {
          scanSingleToken(state, context);
      }
      else {
          report(state, t === 121 || t === 126 ? 102 : 118, KeywordDescTable[t & 255]);
      }
  }
  function consumeSemicolon(state, context) {
      if ((state.token & 536870912) === 536870912) {
          optional(state, context, 536870929);
      }
      else if ((state.flags & 1) !== 1) {
          report(state, 1, KeywordDescTable[state.token & 255]);
      }
  }
  function recordTokenValue(state, context, scope, type, origin, checkDuplicates, isVarDecl, key) {
      if (scope === -1)
          return;
      if (type & 2) {
          let lex = scope.lex;
          while (lex) {
              const scopeType = lex.type;
              if (lex['@' + key] !== undefined) {
                  if (scopeType === 4) {
                      if (isVarDecl && context & 16) ;
                      else {
                          report(state, 31, key);
                      }
                  }
                  else if (scopeType === 2) {
                      report(state, 85);
                  }
                  else if (scopeType !== 5) {
                      if (checkIfAlreadyBound(scope, '@' + key, context, origin) === true) {
                          report(state, 85, key);
                      }
                  }
              }
              lex = lex['@'];
          }
          let x = scope.var['@' + key];
          if (x === undefined) {
              x = 1;
          }
          else {
              ++x;
          }
          scope.var['@' + key] = x;
          let lexVars = scope.lexVars;
          while (lexVars) {
              lexVars['@' + key] = true;
              lexVars = lexVars['@'];
          }
      }
      else {
          const lex = scope.lex;
          if (checkDuplicates) {
              checkIfExistInParentScope(state, context, scope, origin, '@' + key);
              if (lex['@' + key] !== undefined) {
                  if (checkIfAlreadyBound(scope, '@' + key, context, origin) === true) {
                      report(state, 30, key);
                  }
              }
          }
          let x = lex['@' + key];
          if (x === undefined) {
              x = 1;
          }
          else {
              ++x;
          }
          lex['@' + key] = x;
      }
  }
  function checkIfAlreadyBound(scope, key, context, origin) {
      return context & 1024
          ? true
          : (context & 16) === 0
              ? true
              : origin & 2048
                  ? true
                  : (scope.lex.funcs[key] === true) === false
                      ? true
                      : false;
  }
  function checkIfLexicalAlreadyBound(state, context, scope, origin, skipParent) {
      const lex = scope.lex;
      for (const key in lex) {
          if (key[0] === '@' && key.length > 1) {
              if (lex[key] > 1)
                  return true;
              if (!skipParent)
                  checkIfExistInParentScope(state, context, scope, origin, key);
          }
      }
      return false;
  }
  function checkIfExistInParentScope(state, context, scope, origin, key) {
      const lex = scope.lex;
      const lexParent = lex['@'];
      if (lexParent !== undefined && lexParent[key] !== undefined) {
          if (lexParent.type === 5) {
              report(state, 88);
          }
          else if (lexParent.type === 4) {
              report(state, 87);
          }
      }
      if (scope.lexVars[key] !== undefined) {
          if (checkIfAlreadyBound(scope, key, context, origin) === true) {
              report(state, 30, key.slice(1));
          }
      }
  }
  function addFunctionName(state, context, scope, type, origin, isVarDecl) {
      recordTokenValue(state, context, scope, type, origin, true, isVarDecl, state.tokenValue);
      if (context & 16 && !scope.lex.funcs['@' + state.tokenValue]) {
          scope.lex.funcs['@' + state.tokenValue] = true;
      }
  }
  function validateFunctionArgs(state, arg, isSimple) {
      for (const key in arg) {
          if (key[0] === '@' && key.length > 1 && arg[key] > 1) {
              report(state, isSimple ? 107 : 106, key.slice(1));
          }
      }
  }
  function lookAheadOrScan(state, context, callback, isLookahead) {
      const { index, line, column, startIndex, endIndex, flags, tokenValue, currentChar, token, tokenRegExp, tokenRaw } = state;
      const result = callback(state, context);
      if (!result || isLookahead) {
          state.index = index;
          state.line = line;
          state.column = column;
          state.startIndex = startIndex;
          state.endIndex = endIndex;
          state.flags = flags;
          state.tokenValue = tokenValue;
          state.currentChar = currentChar;
          state.tokenRaw = tokenRaw;
          state.token = token;
          state.tokenRegExp = tokenRegExp;
      }
      return result;
  }
  function isLexical(state, context) {
      scanSingleToken(state, context);
      const { token } = state;
      return !!((token & 405505) === 274432 ||
          (token & 12288) === 12288 ||
          token === 131084 ||
          token === 131091 ||
          state.token & 2097152 ||
          state.token & 524288 ||
          token === 402821192);
  }
  function reinterpret(state, ast) {
      switch (ast.type) {
          case 'ArrayExpression':
              ast.type = 'ArrayPattern';
              const elements = ast.elements;
              for (let i = 0, n = elements.length; i < n; ++i) {
                  const element = elements[i];
                  if (element)
                      reinterpret(state, element);
              }
              break;
          case 'ObjectExpression':
              ast.type = 'ObjectPattern';
              const properties = ast.properties;
              for (let i = 0, n = properties.length; i < n; ++i) {
                  reinterpret(state, properties[i]);
              }
              break;
          case 'AssignmentExpression':
              ast.type = 'AssignmentPattern';
              if (ast.operator !== '=')
                  report(state, 0);
              delete ast.operator;
              reinterpret(state, ast.left);
              break;
          case 'Property':
              reinterpret(state, ast.value);
              break;
          case 'SpreadElement':
              ast.type = 'RestElement';
              reinterpret(state, ast.argument);
      }
  }
  function nameIsArgumentsOrEval(value) {
      return value === 'eval' || value === 'arguments';
  }
  function isValidIdentifier(context, t) {
      if (context & 1024) {
          if (context & 2048 && t & 524288)
              return false;
          if (t & 2097152)
              return false;
          return (t & 274432) === 274432 || (t & 12288) === 12288;
      }
      return ((t & 274432) === 274432 ||
          (t & 12288) === 12288 ||
          (t & 36864) === 36864);
  }
  function validateBindingIdentifier(state, context, type, token = state.token) {
      if (context & 1024) {
          if (token === 36969)
              report(state, 61);
          if (token === 126) {
              report(state, 102);
          }
          if ((token & 36864) === 36864) {
              report(state, 109);
          }
      }
      if (token === 20595)
          report(state, 109);
      if (token & 524288) {
          if (context & (4194304 | 2048))
              report(state, 60);
          state.flags = state.flags | 4096;
      }
      if (token & 2097152) {
          if (context & (2097152 | 1024))
              report(state, 56, 'yield');
          state.flags = state.flags | 8192;
      }
      if (token === 402821192) {
          if (type & 16)
              report(state, 57);
          if (type & (4 | 8))
              report(state, 58);
          if (context & 1024)
              report(state, 59);
      }
      if (token === 121) {
          report(state, 102);
      }
      if ((token & 20480) === 20480) {
          report(state, 110);
      }
      return true;
  }
  function addToExportedNamesAndCheckDuplicates(state, exportedName) {
      if (state.exportedNames !== undefined && exportedName !== '') {
          const hashed = '@' + exportedName;
          if (state.exportedNames[hashed])
              report(state, 37, exportedName);
          state.exportedNames[hashed] = 1;
      }
  }
  function addToExportedBindings(state, exportedName) {
      if (state.exportedBindings !== undefined && exportedName !== '') {
          const hashed = '@' + exportedName;
          state.exportedBindings[hashed] = 1;
      }
  }
  function nextTokenIsFuncKeywordOnSameLine(state, context) {
      const line = state.line;
      scanSingleToken(state, context);
      return state.token === 151639 && state.line === line;
  }
  function isIterationStatement(state) {
      return state.token === 20577 || state.token === 20561 || state.token === 20566;
  }
  function addLabel(state, label) {
      if (state.labelSet === undefined)
          state.labelSet = {};
      state.labelSet[`@${label}`] = true;
      state.labelSetStack[state.labelDepth] = state.labelSet;
      state.iterationStack[state.labelDepth] = isIterationStatement(state);
      state.labelSet = undefined;
      state.labelDepth++;
  }
  function addCrossingBoundary(state) {
      state.labelSetStack[state.labelDepth] = state.functionBoundaryStack;
      state.iterationStack[state.labelDepth] = 0;
      state.labelDepth++;
  }
  function validateContinueLabel(state, label) {
      const sstate = getLabel(state, `@${label}`, true);
      if ((sstate & 1) !== 1) {
          if (sstate & 2) {
              report(state, 0);
          }
          else {
              report(state, 83, 'continue');
          }
      }
  }
  function validateBreakStatement(state, label) {
      if ((getLabel(state, `@${label}`) & 1) !== 1)
          report(state, 83);
  }
  function getLabel(state, label, iterationStatement = false, crossBoundary = false) {
      if (!iterationStatement && state.labelSet && state.labelSet[label] === true) {
          return 1;
      }
      if (!state.labelSetStack)
          return 0;
      let stopAtTheBorder = false;
      for (let i = state.labelDepth - 1; i >= 0; i--) {
          const labelSet = state.labelSetStack[i];
          if (labelSet === state.functionBoundaryStack) {
              if (crossBoundary) {
                  break;
              }
              else {
                  stopAtTheBorder = true;
                  continue;
              }
          }
          if (iterationStatement && state.iterationStack[i] === false) {
              continue;
          }
          if (labelSet[label] === true) {
              return stopAtTheBorder ? 2 : 1;
          }
      }
      return 0;
  }
  function recordTokenValueAndDeduplicate(state, context, scope, type, origin, isVarDecl, name) {
      recordTokenValue(state, context, scope, type, origin, true, isVarDecl, name);
      if (context & 16) {
          scope.lex.funcs['#' + state.tokenValue] = false;
      }
  }
  function createScope(type) {
      return {
          var: {},
          lexVars: {},
          lex: {
              '@': undefined,
              type,
              funcs: {}
          }
      };
  }
  function createSubScope(parent, type) {
      return {
          var: parent.var,
          lexVars: {
              '@': parent.lexVars
          },
          lex: {
              '@': parent.lex,
              type,
              funcs: []
          }
      };
  }
  function nextTokenIsLeftParenOrPeriod(state, context) {
      scanSingleToken(state, context);
      return state.token === 131083 || state.token === 13;
  }
  function secludeGrammar(state, context, minprec = 0, callback) {
      const { assignable, bindable, pendingCoverInitializeError } = state;
      state.bindable = true;
      state.assignable = true;
      state.pendingCoverInitializeError = null;
      const result = callback(state, context, minprec);
      if (state.pendingCoverInitializeError !== null) {
          report(state, state.pendingCoverInitializeError);
      }
      state.bindable = bindable;
      state.assignable = assignable;
      state.pendingCoverInitializeError = pendingCoverInitializeError;
      return result;
  }
  function secludeGrammarWithLocation(state, context, start, line, column, callback) {
      const { assignable, bindable, pendingCoverInitializeError } = state;
      state.bindable = true;
      state.assignable = true;
      state.pendingCoverInitializeError = null;
      const result = callback(state, context, start, line, column);
      if (state.pendingCoverInitializeError !== null) {
          report(state, state.pendingCoverInitializeError);
      }
      state.bindable = bindable;
      state.assignable = assignable;
      state.pendingCoverInitializeError = pendingCoverInitializeError;
      return result;
  }
  function acquireGrammar(state, context, minprec, callback) {
      const { assignable, bindable, pendingCoverInitializeError } = state;
      state.bindable = true;
      state.assignable = true;
      state.pendingCoverInitializeError = null;
      const result = callback(state, context, minprec);
      state.bindable = state.bindable && bindable;
      state.assignable = state.assignable && assignable;
      state.pendingCoverInitializeError = pendingCoverInitializeError || state.pendingCoverInitializeError;
      return result;
  }
  function isValidSimpleAssignmentTarget(node) {
      return node.type === 'Identifier' || node.type === 'MemberExpression' ? true : false;
  }

  function parseFormalParameters(state, context, scope, origin, objState) {
      expect(state, context, 131083);
      const { startIndex: start, startLine: line, startColumn: column } = state;
      const params = [];
      state.flags = (state.flags | 64) ^ 64;
      context = context | 8388608;
      let hasComplexArgs = false;
      while (state.token !== 16) {
          if (state.token === 14) {
              hasComplexArgs = true;
              if (objState & 512)
                  report(state, 82);
              params.push(parseRestElement(state, context, scope, 1, 0));
              break;
          }
          if ((state.token & 405505) !== 405505)
              hasComplexArgs = true;
          let left = parseBindingIdentifierOrPattern(state, context, scope, 1, origin, false);
          if (optional(state, context | 32768, 8388637)) {
              hasComplexArgs = true;
              if (context & (2048 | 4194304) && state.token & 524288)
                  report(state, 92);
              if (context & (1024 | 2097152) && state.token & 2097152)
                  report(state, 93);
              left = parseAssignmentPattern(state, context, left, start, line, column);
          }
          params.push(left);
          if (state.token !== 16) {
              expect(state, context, 18);
          }
      }
      if (objState & 512 && params.length !== 1) {
          report(state, 81, 'Setter', 'one', '');
      }
      if (objState & 256 && params.length > 0) {
          report(state, 81, 'Getter', 'no', 's');
      }
      expect(state, context, 16);
      if (hasComplexArgs || (context & (1024 | 33554432)) > 0) {
          validateFunctionArgs(state, scope.lex, hasComplexArgs);
      }
      if (hasComplexArgs)
          state.flags |= 64;
      return params;
  }
  function parseRestElement(state, context, scope, type, origin) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 14);
      if (context & 1048576 && state.token & 524288)
          state.flags |= 4096;
      const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, false);
      return finishNode(state, context, start, line, column, {
          type: 'RestElement',
          argument
      });
  }
  function parseFunctionBody(state, context, scope, firstRestricted, origin) {
      const body = [];
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context | 32768, 131084);
      const prevContext = context;
      while (state.token === 131075) {
          if (state.index - state.startIndex < 13 && state.tokenValue === 'use strict') {
              if (state.flags & 64)
                  report(state, 105);
              context |= 1024;
          }
          body.push(parseDirective(state, context, scope));
      }
      if (context & 1024) {
          if ((state.flags & 512) === 512)
              report(state, 74);
          if (state.flags & 1024) {
              report(state, 73);
          }
          if ((firstRestricted && firstRestricted === 'eval') || firstRestricted === 'arguments')
              report(state, 50);
      }
      context = context | (4096 | 134217728);
      if ((prevContext & 1024) < 1 && (context & 1024) > 0)
          validateFunctionArgs(state, scope.lex['@'], false);
      if (state.token !== 536870927) {
          const previousSwitchStatement = state.switchStatement;
          const previousIterationStatement = state.iterationStatement;
          if ((state.iterationStatement & 1) === 1) {
              state.iterationStatement = 2;
          }
          addCrossingBoundary(state);
          while (state.token !== 536870927) {
              body.push(parseStatementListItem(state, context, scope));
          }
          state.labelDepth--;
          state.switchStatement = previousSwitchStatement;
          state.iterationStatement = previousIterationStatement;
      }
      expect(state, origin & (1024 | 256) ? context | 32768 : context, 536870927);
      return finishNode(state, context, start, line, column, {
          type: 'BlockStatement',
          body
      });
  }
  function parseExpressions(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      const expr = secludeGrammar(state, context, 0, parseAssignmentExpression);
      if (state.token !== 18)
          return expr;
      return parseSequenceExpression(state, context, expr, start, line, column);
  }
  function parseSequenceExpression(state, context, left, start, line, column) {
      const expressions = [left];
      while (optional(state, context | 32768, 18)) {
          expressions.push(secludeGrammar(state, context, 0, parseAssignmentExpression));
      }
      return finishNode(state, context, start, line, column, {
          type: 'SequenceExpression',
          expressions
      });
  }
  function parseYieldExpression(state, context, start, line, column) {
      if (context & 8388608) {
          report(state, 93);
      }
      expect(state, context | 32768, 2265194);
      state.flags = state.flags | 8192;
      let argument = null;
      let delegate = false;
      if ((state.flags & 1) < 1) {
          delegate = optional(state, context, 21105203);
          if (state.token & 131072 || delegate) {
              argument = parseAssignmentExpression(state, context);
          }
      }
      return finishNode(state, context, start, line, column, {
          type: 'YieldExpression',
          argument,
          delegate
      });
  }
  function parseAssignmentExpression(state, context) {
      const { token, tokenValue, startIndex: start, startLine: line, startColumn: column } = state;
      if (token & 2097152 && context & 2097152)
          return parseYieldExpression(state, context, start, line, column);
      const expr = acquireGrammar(state, context, 0, parseBinaryExpression);
      if ((state.flags & 1) < 1) {
          if (token & 1048576 &&
              ((state.token & 274432) === 274432 ||
                  state.token === 126 ||
                  (!(context & 2097152) && state.token & 2097152) === 2097152)) {
              const { tokenValue } = state;
              const arg = parseIdentifier(state, context);
              if (state.token !== 131082)
                  report(state, 1, KeywordDescTable[state.token & 255]);
              const scope = createScope(5);
              recordTokenValueAndDeduplicate(state, context, scope, 1, 0, true, tokenValue);
              return parseArrowFunctionExpression(state, context, scope, [arg], true, start, line, column, 64);
          }
          if (state.token === 131082 &&
              (token & 274432 ||
                  token === 131083 ||
                  token === 121 ||
                  token === 126)) {
              let { type, scope: arrowScope, params } = expr;
              state.bindable = state.assignable = false;
              state.pendingCoverInitializeError = null;
              if ((type & 6) < 1) {
                  if ((token & 36864) === 36864) {
                      state.flags |= 512;
                  }
                  else if (tokenValue === 'eval' || tokenValue === 'arguments') {
                      if (context & 1024)
                          report(state, 73);
                      state.flags |= 1024;
                  }
                  arrowScope = createScope(5);
                  params = [expr];
                  type = 64;
                  recordTokenValueAndDeduplicate(state, context, arrowScope, 1, 0, true, tokenValue);
              }
              return parseArrowFunctionExpression(state, context, arrowScope, params, (type & 4) > 0, start, line, column, type);
          }
      }
      let operator = 536870912;
      if ((state.token & 8388608) === 8388608) {
          if (context & 1024 && nameIsArgumentsOrEval(expr.name)) {
              report(state, 112, expr.name === 'eval' ? 'eval' : 'arguments');
          }
          else if (state.token === 8388637) {
              if (!state.assignable)
                  report(state, 72);
              reinterpret(state, expr);
              operator = state.token;
              scanSingleToken(state, context | 32768);
              if (context & 1048576) {
                  state.flags |= 64;
                  if (context & (1024 | 2097152) && state.token & 2097152) {
                      state.flags |= 8192;
                  }
                  else if (state.token & 524288) {
                      state.flags |= 4096;
                  }
              }
          }
          else {
              if (!state.assignable || !isValidSimpleAssignmentTarget(expr))
                  report(state, 72);
              state.bindable = state.assignable = false;
              operator = state.token;
              scanSingleToken(state, context | 32768);
          }
          const right = secludeGrammar(state, context, 0, parseAssignmentExpression);
          state.pendingCoverInitializeError = null;
          return finishNode(state, context, start, line, column, {
              type: 'AssignmentExpression',
              left: expr,
              operator: KeywordDescTable[operator & 255],
              right
          });
      }
      return parseConditionalExpression(state, context, expr, start, line, column);
  }
  function parseConditionalExpression(state, context, test, start, line, column) {
      if (!optional(state, context | 32768, 22))
          return test;
      const consequent = secludeGrammar(state, (context | 8192) ^ 8192, 0, parseAssignmentExpression);
      expect(state, context | 32768, 21);
      const alternate = secludeGrammar(state, context, 0, parseAssignmentExpression);
      state.bindable = state.assignable = false;
      return finishNode(state, context, start, line, column, {
          type: 'ConditionalExpression',
          test,
          consequent,
          alternate
      });
  }
  function parseBinaryExpression(state, context, minPrec, start = state.startIndex, line = state.startLine, column = state.startColumn, left = parseUnaryExpression(state, context)) {
      const bit = -((context & 8192) > 0) & 33707825;
      let t;
      let prec;
      while (state.token & 16908288) {
          t = state.token;
          prec = t & 3840;
          if (prec + ((t === 16911158) << 8) - ((bit === t) << 12) <= minPrec)
              break;
          scanSingleToken(state, context | 32768);
          left = finishNode(state, context, start, line, column, {
              type: t & 65536 ? 'LogicalExpression' : 'BinaryExpression',
              left,
              right: secludeGrammar(state, context, prec, parseBinaryExpression),
              operator: KeywordDescTable[t & 255]
          });
          state.assignable = state.bindable = false;
      }
      return left;
  }
  function parseAwaitExpression(state, context, start, line, column) {
      state.assignable = false;
      if (context & 8388608)
          report(state, 92);
      scanSingleToken(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'AwaitExpression',
          argument: secludeGrammar(state, context, 0, parseUnaryExpression)
      });
  }
  function parseUnaryExpression(state, context) {
      const { token, startIndex: start, startLine: line, startColumn: column } = state;
      if ((token & 33685504) === 33685504) {
          const unaryOperator = state.token;
          scanSingleToken(state, context | 32768);
          const argument = secludeGrammar(state, context, 0, parseUnaryExpression);
          if (state.token === 16911158)
              report(state, 46);
          if (context & 1024 && (unaryOperator & 33706027) === 33706027) {
              if (argument.type === 'Identifier') {
                  report(state, 45);
              }
              else if (context & 1 && state.flags & 128) {
                  report(state, 70);
              }
          }
          state.bindable = state.assignable = false;
          return finishNode(state, context, start, line, column, {
              type: 'UnaryExpression',
              operator: KeywordDescTable[unaryOperator & 255],
              argument,
              prefix: true
          });
      }
      return (context & 4194304 ||
          ((context & 134217728) === 0 && context & 536870912)) &&
          token & 524288
          ? parseAwaitExpression(state, context, start, line, column)
          : parseUpdateExpression(state, context, start, line, column);
  }
  function parseUpdateExpression(state, context, start, line, column) {
      const { token } = state;
      if ((state.token & 67239936) === 67239936) {
          scanSingleToken(state, context | 32768);
          const expr = parseLeftHandSideExpression(state, context, start, line, column);
          if (context & 1024 && (expr.name === 'eval' || expr.name === 'arguments')) {
              report(state, 71, 'Prefix');
          }
          if (!state.assignable)
              report(state, 72);
          state.bindable = state.assignable = false;
          return finishNode(state, context, start, line, column, {
              type: 'UpdateExpression',
              argument: expr,
              operator: KeywordDescTable[token & 255],
              prefix: true
          });
      }
      const expression = parseLeftHandSideExpression(state, context, start, line, column);
      if ((state.token & 67239936) === 67239936 && (state.flags & 1) < 1) {
          if (context & 1024 && (expression.name === 'eval' || expression.name === 'arguments')) {
              report(state, 71, 'PostFix');
          }
          if (!state.assignable)
              report(state, 72);
          const operator = state.token;
          scanSingleToken(state, context);
          state.bindable = state.assignable = false;
          return finishNode(state, context, start, line, column, {
              type: 'UpdateExpression',
              argument: expression,
              operator: KeywordDescTable[operator & 255],
              prefix: false
          });
      }
      return expression;
  }
  function parseLeftHandSideExpression(state, context, start, line, column) {
      const expr = context & 1 && state.token === 151641
          ? parseCallImportOrMetaProperty(state, context, false)
          : state.token === 151644
              ? parseSuperExpression(state, context)
              : parseMemberExpression(state, context, start, line, column, parsePrimaryExpression(state, context, start, line, column));
      return parseCallExpression(state, (context | 8192) ^ 8192, start, line, column, expr);
  }
  function parseCallExpression(state, context, start, line, column, callee) {
      const isAsync = callee.name === 'async';
      const scope = state.bindable && isAsync ? createScope(1) : null;
      const { flags } = state;
      let pState = 0;
      while (true) {
          callee = parseMemberExpression(state, context, start, line, column, callee);
          if (state.token !== 131083)
              return callee;
          expect(state, context | 32768, 131083);
          let seenSpread = false;
          let spreadCount = 0;
          const params = [];
          while (state.token !== 16) {
              if (state.token === 14) {
                  state.flags = state.flags | 64;
                  params.push(parseSpreadElement(state, context, 0));
                  seenSpread = true;
              }
              else {
                  const { token } = state;
                  if (isAsync && token === 405505) {
                      recordTokenValue(state, context, scope, 1, 0, false, false, state.tokenValue);
                  }
                  if ((token & 2097152) === 2097152) {
                      pState = pState | 2;
                  }
                  else if (token === 131084 || token === 131091)
                      state.flags |= 64;
                  if ((token & 36864) === 36864) {
                      pState = pState | 1;
                  }
                  else if ((token & 524288) === 524288) {
                      pState = pState | 4;
                  }
                  params.push(secludeGrammar(state, context | 1048576, 0, parseAsyncArgument));
              }
              if (state.token === 16)
                  break;
              expect(state, context | 32768, 18);
              state.assignable = false;
              if (seenSpread)
                  spreadCount++;
          }
          expect(state, context, 16);
          if (state.token === 131082) {
              if (flags & 1)
                  report(state, 103, '=>');
              if (pState & 2) {
                  if (context & (2097152 | 1024))
                      report(state, 93);
                  state.flags |= 512;
              }
              else if (state.flags & 8192) {
                  report(state, 93);
              }
              else if (pState & 4 || state.flags & 4096) {
                  report(state, 92);
              }
              if (!state.bindable)
                  report(state, 117);
              state.bindable = state.assignable = false;
              if (spreadCount > 0)
                  report(state, 79);
              state.bindable = false;
              return {
                  type: 4,
                  scope,
                  params
              };
          }
          state.flags =
              (state.flags | 8192 | 4096 | 64) ^
                  (8192 | 4096 | 64);
          state.bindable = state.assignable = false;
          callee = finishNode(state, context, start, line, column, {
              type: 'CallExpression',
              callee,
              arguments: params
          });
      }
  }
  function parseCallImportOrMetaProperty(state, context, isNew) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      const id = parseIdentifier(state, context);
      if (optional(state, context, 13)) {
          if (context & 2048 && state.tokenValue === 'meta')
              return parseMetaProperty(state, context, id);
          report(state, 1, KeywordDescTable[state.token & 255]);
      }
      else if (isNew && state.token === 131083)
          report(state, 1, KeywordDescTable[state.token & 255]);
      const expr = parseImportExpression(state, context);
      return parseCallExpression(state, context, start, line, column, expr);
  }
  function parseImportExpression(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      return finishNode(state, context, start, line, column, {
          type: 'Import'
      });
  }
  function parseMetaProperty(state, context, id) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      return finishNode(state, context, start, line, column, {
          meta: id,
          type: 'MetaProperty',
          property: parseIdentifier(state, context)
      });
  }
  function parseSuperExpression(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      state.assignable = state.bindable = false;
      switch (state.token) {
          case 131083:
              if ((context & 524288) < 1)
                  report(state, 47);
              break;
          case 131091:
          case 13:
              if ((context & 262144) < 1)
                  report(state, 48);
              state.assignable = true;
              break;
          default:
              report(state, 1, 'super');
      }
      return finishNode(state, context, start, line, column, { type: 'Super' });
  }
  function parseIdentifierNameOrPrivateName(state, context) {
      if (!optional(state, context, 119))
          return parseIdentifierName(state, context);
      const { startIndex: start, startLine: line, startColumn: column } = state;
      state.flags |= 128;
      return finishNode(state, context, start, line, column, {
          type: 'PrivateName',
          name: state.tokenValue
      });
  }
  function parseIdentifierName(state, context) {
      if ((state.token & (274432 | 4096)) !== 274432 &&
          (state.token & 4096) !== 4096)
          report(state, 0);
      return parseIdentifier(state, context);
  }
  function parseMemberExpression(state, context, start, line, column, expr) {
      while (true) {
          switch (state.token) {
              case 13:
                  scanSingleToken(state, context);
                  state.bindable = false;
                  state.assignable = true;
                  expr = finishNode(state, context, start, line, column, {
                      type: 'MemberExpression',
                      object: expr,
                      computed: false,
                      property: parseIdentifierName(state, context)
                  });
                  continue;
              case 131091: {
                  scanSingleToken(state, context | 32768);
                  state.bindable = false;
                  state.assignable = true;
                  expr = finishNode(state, context, start, line, column, {
                      type: 'MemberExpression',
                      object: expr,
                      computed: true,
                      property: parseExpressions(state, (context | 8192) ^ 8192)
                  });
                  expect(state, context, 20);
                  break;
              }
              case 131081:
                  state.bindable = state.assignable = false;
                  expr = finishNode(state, context, state.startIndex, state.startLine, state.startColumn, {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi: parseTemplateLiteral(state, context)
                  });
                  break;
              case 131080:
                  state.bindable = state.assignable = false;
                  expr = finishNode(state, context, start, line, column, {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi: parseTemplate(state, context | 65536, state.startIndex, state.startLine, state.startColumn)
                  });
                  break;
              default:
                  return expr;
          }
      }
  }
  function parseTemplateLiteral(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      return finishNode(state, context, start, line, column, {
          type: 'TemplateLiteral',
          expressions: [],
          quasis: [parseTemplateTail(state, context)]
      });
  }
  function parseTemplateSpans(state, context, start, line, column, tail) {
      return finishNode(state, context, start, line, column, {
          type: 'TemplateElement',
          value: {
              cooked: state.tokenValue,
              raw: state.tokenRaw
          },
          tail
      });
  }
  function parseTemplate(state, context, start, line, column) {
      const quasis = [parseTemplateSpans(state, context, start, line, column, false)];
      expect(state, context | 32768, 131080);
      state.bindable = state.assignable = false;
      const expressions = [parseExpressions(state, (context | 8192) ^ 8192)];
      while ((state.token = scanTemplateTail(state, context)) !== 131081) {
          quasis.push(parseTemplateSpans(state, context, state.startIndex, state.startLine, state.startColumn, false));
          expect(state, context | 32768, 131080);
          expressions.push(parseExpressions(state, context));
      }
      quasis.push(parseTemplateSpans(state, context, state.startIndex, state.startLine, state.startColumn, true));
      state.assignable = state.bindable = false;
      scanSingleToken(state, context);
      return finishNode(state, context, start, line, column, {
          type: 'TemplateLiteral',
          expressions,
          quasis
      });
  }
  function parseTemplateTail(state, context) {
      const { tokenValue, tokenRaw, startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context | 32768, 131081);
      return finishNode(state, context, start, line, column, {
          type: 'TemplateElement',
          value: {
              cooked: tokenValue,
              raw: tokenRaw
          },
          tail: true
      });
  }
  function parseArgumentList(state, context) {
      expect(state, context | 32768, 131083);
      const expressions = [];
      while (state.token !== 16) {
          if (state.token === 14) {
              expressions.push(parseSpreadElement(state, context, 64));
              if (state.token === 16)
                  break;
              expect(state, context, 18);
              continue;
          }
          else {
              expressions.push(secludeGrammar(state, context, 0, parseAssignmentExpression));
          }
          if (!optional(state, context | 32768, 18))
              break;
      }
      expect(state, context, 16);
      return expressions;
  }
  function parseSpreadElement(state, context, origin) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context | 32768, 14);
      if (state.token & 524288)
          state.flags = state.flags | 4096;
      if (origin & 8192 && (state.token === 131091 || state.token === 131084)) {
          state.bindable = state.assignable = false;
      }
      const argument = acquireGrammar(state, context, 0, parseAssignmentExpression);
      if (origin & ((origin & 8192) | 4096)) {
          if (argument.type !== 'ArrayExpression' &&
              argument.type !== 'ObjectExpression' &&
              !isValidSimpleAssignmentTarget(argument)) {
              state.bindable = state.assignable = false;
          }
      }
      return finishNode(state, context, start, line, column, {
          type: 'SpreadElement',
          argument
      });
  }
  function parseAsyncArgument(state, context) {
      const arg = parseAssignmentExpression(state, context);
      state.pendingCoverInitializeError = null;
      return arg;
  }
  function parseNewExpression(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      const id = parseIdentifier(state, context | 32768);
      if (optional(state, context, 13)) {
          return (context & 67108864) < 1 || state.tokenValue !== 'target'
              ? report(state, 0)
              : parseMetaProperty(state, context, id);
      }
      if ((state.token & 33685504) === 33685504) {
          report(state, 122, KeywordDescTable[state.token & 255]);
      }
      const callee = context & 1 && state.token === 151641
          ? parseCallImportOrMetaProperty(state, context, true)
          : secludeGrammarWithLocation(state, context, start, line, column, parseMemberExpressionOrHigher);
      return finishNode(state, context, start, line, column, {
          type: 'NewExpression',
          callee,
          arguments: state.token === 131083 ? parseArgumentList(state, context) : []
      });
  }
  function parseMemberExpressionOrHigher(state, context, start, line, column) {
      return parseMemberExpression(state, context, start, line, column, parsePrimaryExpression(state, context, start, line, column));
  }
  function parsePrimaryExpression(state, context, start, line, column) {
      const { token } = state;
      if ((token & 274432) === 274432 || token === 126) {
          return parseIdentifier(state, context | 65536);
      }
      if (token & 1048576) {
          if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
              state.bindable = state.assignable = false;
              return parseFunctionExpression(state, context, true);
          }
          return parseIdentifier(state, context);
      }
      switch (token) {
          case 131074:
          case 131075:
              state.bindable = state.assignable = false;
              return parseLiteral(state, context);
          case 116:
              state.bindable = state.assignable = false;
              return parseBigIntLiteral(state, context);
          case 131076:
              state.bindable = state.assignable = false;
              return parseRegExpLiteral(state, context);
          case 151558:
          case 151557:
          case 151559:
              state.bindable = state.assignable = false;
              return parseNullOrTrueOrFalseLiteral(state, context);
          case 151646:
              state.bindable = state.assignable = false;
              return parseThisExpression(state, context);
          case 131091:
              return parseArrayLiteral(state, (context | 8192) ^ 8192);
          case 131083:
              return parseParenthesizedExpression(state, context);
          case 131084:
              return parseObjectLiteral(state, (context | 8192) ^ 8192, -1, 0);
          case 151639:
              state.bindable = state.assignable = false;
              return parseFunctionExpression(state, context, false);
          case 151629:
              state.bindable = state.assignable = false;
              return parseClassExpression(state, context);
          case 131081:
              state.bindable = state.assignable = false;
              return parseTemplateLiteral(state, context);
          case 131080:
              state.bindable = state.assignable = false;
              return parseTemplate(state, context, start, line, column);
          case 151642:
              state.bindable = state.assignable = false;
              return parseNewExpression(state, context);
          case 151644:
              state.bindable = state.assignable = false;
              return parseSuperExpression(state, context);
          case 119:
              state.bindable = state.assignable = false;
              return parseIdentifierNameOrPrivateName(state, context);
          case 402821192: {
              if (context & 1024)
                  report(state, 74);
              const { startIndex: start, startLine: line, startColumn: column } = state;
              scanSingleToken(state, context);
              if (state.flags & 1 && state.token === 131091) {
                  report(state, 84);
              }
              return context & 8
                  ? finishNode(state, context, start, line, column, {
                      type: 'Identifier',
                      name: 'let',
                      raw: 'let'
                  })
                  : finishNode(state, context, start, line, column, {
                      type: 'Identifier',
                      name: 'let'
                  });
          }
          case 20561:
              return parseDoExpression(state, context);
          case 2265194:
              if (context & (2097152 | 1024)) {
                  report(state, 56, KeywordDescTable[state.token & 255]);
              }
          default:
              if (isValidIdentifier(context, state.token)) {
                  return parseIdentifier(state, context | 65536);
              }
              report(state, state.token === 121 || state.token === 126
                  ? 102
                  : 1, KeywordDescTable[state.token & 255]);
      }
  }
  function parseDoExpression(state, context) {
      if ((context & 128) < 1)
          report(state, 78);
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 20561);
      return finishNode(state, context, start, line, column, {
          type: 'DoExpression',
          body: parseBlockStatement(state, context, createScope(1))
      });
  }
  function parseArrayLiteral(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      const elements = [];
      while (state.token !== 20) {
          if (optional(state, context, 18)) {
              elements.push(null);
              if (state.token === 131091) {
                  break;
              }
          }
          else if (state.token === 14) {
              elements.push(parseSpreadElement(state, context, 4096));
              if (state.token !== 20) {
                  state.bindable = state.assignable = false;
                  expect(state, context, 18);
              }
          }
          else {
              elements.push(acquireGrammar(state, context, 0, parseAssignmentExpression));
              if (optional(state, context, 18)) {
                  if (state.token === 20) {
                      break;
                  }
              }
              else {
                  break;
              }
          }
      }
      expect(state, context, 20);
      return finishNode(state, context, start, line, column, {
          type: 'ArrayExpression',
          elements
      });
  }
  function parseFunctionExpression(state, context, isAsync) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 151639);
      const isGenerator = optional(state, context, 21105203);
      let functionScope = createScope(1);
      let id = null;
      let firstRestricted;
      if (state.token & 274432 || state.token === 126) {
          validateBindingIdentifier(state, ((context | (2097152 | 4194304)) ^ (2097152 | 4194304)) |
              (context & 1024 ? 2097152 : isGenerator ? 2097152 : 0) |
              (context & 2048 ? 4194304 : isAsync ? 4194304 : 0), 2);
          recordTokenValueAndDeduplicate(state, context, functionScope, 2, 0, true, state.tokenValue);
          functionScope = createSubScope(functionScope, 1);
          firstRestricted = state.tokenValue;
          id = parseIdentifier(state, context);
      }
      context =
          ((context |
              4194304 |
              2097152 |
              8388608 |
              262144 |
              524288 |
              16777216) ^
              (4194304 |
                  2097152 |
                  8388608 |
                  262144 |
                  524288 |
                  16777216)) |
              (isAsync ? 4194304 : 0) |
              (isGenerator ? 2097152 : 0) |
              67108864;
      const paramScoop = createSubScope(functionScope, 5);
      const params = parseFormalParameters(state, context, paramScoop, 64, 0);
      const body = parseFunctionBody(state, context, createSubScope(paramScoop, 1), firstRestricted, 0);
      return finishNode(state, context, start, line, column, {
          type: 'FunctionExpression',
          params,
          body,
          async: isAsync,
          generator: isGenerator,
          id
      });
  }
  function parseArrowFunctionExpression(state, context, scope, params, isAsync, start, line, column, type) {
      if (state.flags & 1)
          report(state, 103, '=>');
      if (type & 64) {
          expect(state, context | 32768, 131082);
      }
      else {
          expect(state, context, 131082);
          for (let i = 0; i < params.length; ++i)
              reinterpret(state, params[i]);
          if (checkIfLexicalAlreadyBound(state, context, scope, 0, true)) {
              report(state, 30, 'function argument');
          }
      }
      context =
          ((context | 4194304 | 8388608 | 2097152 | 1048576) ^
              (4194304 | 2097152 | 8388608 | 1048576)) |
              (isAsync ? 4194304 : 0);
      const expression = state.token !== 131084;
      const body = expression
          ? secludeGrammar(state, context, 0, parseAssignmentExpression)
          : parseFunctionBody(state, (context | 4096) ^ 4096, createSubScope(scope, 1), state.tokenValue, 1024);
      return finishNode(state, context, start, line, column, {
          type: 'ArrowFunctionExpression',
          body,
          params,
          id: null,
          async: isAsync,
          expression
      });
  }
  function parseParenthesizedExpression(state, context) {
      state.flags = (state.flags | 64) ^ 64;
      expect(state, context | 32768, 131083);
      const scope = createScope(5);
      context = context | 1048576;
      if (optional(state, context, 16)) {
          if (state.token !== 131082)
              report(state, 0);
          state.assignable = state.bindable = false;
          return {
              type: 2,
              scope,
              params: []
          };
      }
      else if (state.token === 14) {
          state.flags = state.flags | 64;
          const rest = parseRestElement(state, context, scope, 1, 0);
          expect(state, context, 16);
          if (state.token !== 131082)
              report(state, 0);
          state.assignable = state.bindable = false;
          return {
              type: 2,
              scope,
              params: [rest]
          };
      }
      let pState = 0;
      state.bindable = true;
      const { token, startIndex: start, startLine: line, startColumn: column } = state;
      if (token === 131084 || token === 131091)
          state.flags |= 64;
      if ((token & 36864) === 36864 || (token & 2097152) === 2097152) {
          if ((token & 2097152) === 2097152)
              state.flags = state.flags | 8192;
          pState = pState | 1;
      }
      else if ((token & 524288) === 524288) {
          state.flags = state.flags | 4096;
      }
      if (token === 405505) {
          recordTokenValue(state, context, scope, 1, 0, false, false, state.tokenValue);
      }
      let expr = acquireGrammar(state, (context | 8192) ^ 8192, 0, parseAssignmentExpression);
      if (state.token === 18) {
          state.assignable = false;
          pState = pState | 8;
          const params = [expr];
          while (optional(state, context | 32768, 18)) {
              if (optional(state, context, 16)) {
                  if (state.token !== 131082)
                      report(state, 0);
                  state.assignable = false;
                  return {
                      type: 2,
                      scope,
                      params: params
                  };
              }
              state.assignable = false;
              if (state.token === 14) {
                  if (!state.bindable)
                      report(state, 117);
                  state.flags = state.flags | 64;
                  const restElement = parseRestElement(state, context, scope, 1, 0);
                  expect(state, context, 16);
                  if (state.token !== 131082)
                      report(state, 1, KeywordDescTable[state.token & 255]);
                  state.bindable = false;
                  params.push(restElement);
                  return {
                      type: 2,
                      scope,
                      params: params
                  };
              }
              else if (optional(state, context, 16)) {
                  if (state.token !== 131082)
                      report(state, 1, KeywordDescTable[state.token & 255]);
                  return {
                      type: 2,
                      scope,
                      params: params
                  };
              }
              else {
                  if (state.token === 131084 || state.token === 131091) {
                      state.flags = state.flags | 64;
                  }
                  if ((state.token & 36864) === 36864 ||
                      (state.token & 2097152) === 2097152) {
                      state.flags = state.flags | 8192;
                      pState = pState | 1;
                  }
                  else if ((state.token & 524288) === 524288) {
                      state.flags = state.flags | 4096;
                  }
                  if (state.token === 405505) {
                      recordTokenValue(state, context, scope, 1, 0, false, false, state.tokenValue);
                  }
                  params.push(acquireGrammar(state, (context | 8192) ^ 8192, 0, parseAssignmentExpression));
              }
          }
          expr = finishNode(state, context, start, line, column, {
              type: 'SequenceExpression',
              expressions: params
          });
      }
      expect(state, context, 16);
      if (state.token === 131082) {
          if (!state.bindable)
              report(state, 104);
          if (pState & 1) {
              if (context & 1024)
                  report(state, 74);
              state.flags = state.flags | 512;
          }
          else if (context & (1024 | 2097152) && state.flags & 8192) {
              report(state, 93);
          }
          else if (context & (2048 | 4194304) && state.flags & 4096) {
              report(state, 92);
          }
          state.flags = (state.flags | 8192 | 4096) ^ (8192 | 4096);
          state.assignable = state.bindable = false;
          return {
              type: 2,
              scope,
              params: pState & 8 ? expr.expressions : [expr],
              async: false
          };
      }
      state.bindable = false;
      context = (context | 1048576) ^ 1048576;
      state.flags =
          (state.flags | 8192 | 4096 | 64) ^
              (8192 | 4096 | 64);
      if (!isValidSimpleAssignmentTarget(expr))
          state.assignable = false;
      return context & 1073741824
          ? finishNode(state, context, start, line, column, {
              type: 'ParenthesizedExpression',
              expression: expr
          })
          : expr;
  }
  function parseClassExpression(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      context = (context | 1024 | 16777216) ^ 16777216;
      let id = null;
      let superClass = null;
      if (state.token & 274432 && state.token !== 20564) {
          validateBindingIdentifier(state, context, 16);
          recordTokenValue(state, context, -1, 4, 0, false, false, state.tokenValue);
          id = parseIdentifier(state, context);
      }
      if (optional(state, context | 32768, 20564)) {
          superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
          context |= 524288;
      }
      else
          context = (context | 524288) ^ 524288;
      const body = parseClassBodyAndElementList(state, context, 0);
      return finishNode(state, context, start, line, column, {
          type: 'ClassExpression',
          id,
          superClass,
          body
      });
  }
  function parseClassBodyAndElementList(state, context, origin) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context | 32768, 131084);
      const body = [];
      while (state.token !== 536870927) {
          if (!optional(state, context, 536870929)) {
              body.push(parseClassElementList(state, context, 0));
          }
      }
      expect(state, origin & 256 ? context | 32768 : context, 536870927);
      state.flags = (state.flags | 2048) ^ 2048;
      return finishNode(state, context, start, line, column, {
          type: 'ClassBody',
          body
      });
  }
  function parseClassElementList(state, context, modifier) {
      let key;
      let { token, tokenValue, startIndex: start, startLine: line, startColumn: column } = state;
      if (state.token & 274432) {
          key = parseIdentifier(state, context);
          switch (token) {
              case 36969:
                  if ((modifier & 32) === 0 && state.token !== 131083) {
                      return parseClassElementList(state, context, 32);
                  }
                  break;
              case 1060972:
                  if (state.token !== 131083 && (state.flags & 1) === 0) {
                      if (optional(state, context, 21105203))
                          modifier |= 8;
                      tokenValue = state.tokenValue;
                      if (state.token & 274432) {
                          if (state.flags & 1)
                              report(state, 103, 'async');
                          key = parseIdentifier(state, context);
                      }
                      else if (state.token === 131074 || state.token === 131075) {
                          key = parseLiteral(state, context);
                      }
                      else if (state.token === 131091) {
                          modifier |= 2;
                          key = parseComputedPropertyName(state, context);
                      }
                      else {
                          report(state, 0);
                      }
                      modifier |= 16;
                  }
                  break;
              case 12399:
                  if (state.token !== 131083) {
                      tokenValue = state.tokenValue;
                      if (state.token & 274432) {
                          key = parseIdentifier(state, context);
                      }
                      else if (state.token === 131074 || state.token === 131075) {
                          key = parseLiteral(state, context);
                      }
                      else if (state.token === 131091) {
                          modifier |= 2;
                          key = parseComputedPropertyName(state, context);
                      }
                      else if (state.token === 126) {
                          key = parseIdentifier(state, context);
                      }
                      else {
                          report(state, 0);
                      }
                      modifier |= 256;
                  }
                  break;
              case 12400:
                  if (state.token !== 131083) {
                      tokenValue = state.tokenValue;
                      if (state.token & 274432) {
                          key = parseIdentifier(state, context);
                      }
                      else if (state.token === 131074 || state.token === 131075) {
                          key = parseLiteral(state, context);
                      }
                      else if (state.token === 131091) {
                          modifier |= 2;
                          key = parseComputedPropertyName(state, context);
                      }
                      else if (state.token === 126) {
                          key = parseIdentifier(state, context);
                      }
                      else {
                          report(state, 0);
                      }
                      modifier |= 512;
                  }
                  break;
              default:
          }
      }
      else if (state.token === 131091) {
          modifier |= 2;
          key = parseComputedPropertyName(state, context);
      }
      else if (state.token === 131074 || state.token === 131075) {
          if (state.tokenValue === 'constructor')
              modifier |= 64;
          key = parseLiteral(state, context);
      }
      else if (state.token === 21105203) {
          scanSingleToken(state, context);
          tokenValue = state.tokenValue;
          if (state.token & 274432) {
              key = parseIdentifier(state, context);
          }
          else if (state.token === 131074 || state.token === 131075) {
              key = parseLiteral(state, context);
          }
          else if (state.token === 131091) {
              modifier |= 2;
              key = parseComputedPropertyName(state, context);
          }
          else if (state.token === 126) {
              key = parseIdentifier(state, context);
          }
          else {
              report(state, 0);
          }
          modifier |= 8;
      }
      else if (state.token === 536870929) {
          scanSingleToken(state, context);
      }
      else if (state.token === 126) {
          key = parseIdentifier(state, context);
      }
      else {
          report(state, 1, KeywordDescTable[state.token & 255]);
      }
      if ((modifier & 2) === 0 &&
          modifier & (32 | 16 | 768) &&
          state.tokenValue === 'prototype') {
          report(state, 51);
      }
      if (tokenValue === 'constructor') {
          if ((modifier & 32) === 0) {
              if (modifier & (768 | 16 | 8))
                  report(state, 52, 'accessor');
              if ((context & 524288) === 0 && (modifier & 2) === 0) {
                  if (state.flags & 2048)
                      report(state, 49);
                  else
                      state.flags |= 2048;
              }
          }
          modifier |= 64;
      }
      if (state.token !== 131083)
          report(state, 118, '(');
      return finishNode(state, context, start, line, column, {
          type: 'MethodDefinition',
          kind: (modifier & 32) === 0 && modifier & 64
              ? 'constructor'
              : modifier & 256
                  ? 'get'
                  : modifier & 512
                      ? 'set'
                      : 'method',
          static: (modifier & 32) !== 0,
          computed: (modifier & 2) !== 0,
          key,
          value: parseMethodDeclaration(state, context, modifier)
      });
  }
  function parseObjectLiteral(state, context, scope, type) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      let key = null;
      let token = state.token;
      let tokenValue = state.tokenValue;
      let value;
      let hasProto = false;
      const properties = [];
      let objState = 0;
      const { assignable, bindable, pendingCoverInitializeError } = state;
      state.bindable = state.assignable = true;
      state.pendingCoverInitializeError = null;
      while (state.token !== 536870927) {
          if (state.token === 14) {
              properties.push(parseSpreadElement(state, context, 8192));
          }
          else {
              const { startIndex: objStart, startLine: objLine, startColumn: objColumn } = state;
              if (state.token & 274432 ||
                  state.token === 121 ||
                  state.token === 126) {
                  token = state.token;
                  tokenValue = state.tokenValue;
                  objState = 0;
                  key = parseIdentifier(state, context);
                  const newLine = (state.flags & 1) > 0;
                  if (state.token === 18 ||
                      state.token === 536870927 ||
                      state.token === 8388637) {
                      objState |= 4;
                      if (tokenValue !== 'eval' || tokenValue !== 'arguments')
                          validateBindingIdentifier(state, context, type, token);
                      recordTokenValue(state, context, scope, type, 0, false, false, tokenValue);
                      if (state.token === 8388637) {
                          state.pendingCoverInitializeError = 75;
                          expect(state, context, 8388637);
                          value = parseAssignmentPattern(state, context, key, objStart, objLine, objColumn);
                      }
                      else {
                          value = key;
                      }
                  }
                  else if (optional(state, context | 32768, 21)) {
                      if (tokenValue === '__proto__') {
                          if (hasProto) {
                              state.pendingCoverInitializeError = 75;
                          }
                          else
                              hasProto = true;
                      }
                      if (context & 1048576) {
                          if ((state.token & 524288) === 524288) {
                              state.flags = state.flags | 4096;
                          }
                          else if ((state.token & 2097152) === 2097152) {
                              state.flags = state.flags | 8192;
                          }
                      }
                      value = acquireGrammar(state, context, 0, parseAssignmentExpression);
                  }
                  else if (state.token === 131091) {
                      key = parseComputedPropertyName(state, context);
                      if (token === 1060972) {
                          if (newLine)
                              report(state, 103, 'async');
                          objState |= 16 | 2 | 1;
                      }
                      else {
                          if (token === 12399)
                              objState = (objState & ~512) | 256;
                          else if ((token & 12400) === 12400)
                              objState = (objState & ~256) | 512;
                          objState |= 2 & ~1;
                      }
                      if (state.token !== 131083)
                          report(state, 0);
                      state.bindable = state.assignable = false;
                      value = parseMethodDeclaration(state, context, objState);
                  }
                  else if (state.token === 131083) {
                      objState = objState | (1 & ~(16 | 8));
                      state.bindable = state.assignable = false;
                      value = parseMethodDeclaration(state, context, objState);
                  }
                  else {
                      if (optional(state, context, 21105203))
                          objState |= 8;
                      if ((state.token & 274432) > 0) {
                          key = parseIdentifier(state, context);
                          if (state.token !== 131083)
                              report(state, 0);
                          if (token === 1060972) {
                              if (newLine)
                                  report(state, 103, 'async');
                              objState |= 16 | 1;
                          }
                          else if (token === 12399) {
                              objState = (objState & ~512) | 256;
                          }
                          else if (token === 12400) {
                              objState = (objState & ~256) | 512;
                          }
                          state.bindable = state.assignable = false;
                          value = parseMethodDeclaration(state, context, objState);
                      }
                      else if (state.token === 131074 || state.token === 131075) {
                          key = parseLiteral(state, context);
                          if (state.token !== 131083)
                              report(state, 0);
                          if (token === 1060972) {
                              if (newLine)
                                  report(state, 103, 'async');
                              objState |= 16 | 1;
                          }
                          else if (token === 12399) {
                              objState = (objState & ~512) | 256;
                          }
                          else if (token === 12400) {
                              objState = (objState & ~256) | 512;
                          }
                          state.bindable = state.assignable = false;
                          value = parseMethodDeclaration(state, context, objState);
                      }
                      else if (state.token === 131091) {
                          if (token === 1060972) {
                              if (newLine)
                                  report(state, 103, 'async');
                              objState |= 16 | 1;
                          }
                          else if (token === 12399) {
                              objState = (objState & ~512) | 256;
                          }
                          else if (token === 12400) {
                              objState = (objState & ~256) | 512;
                          }
                          key = parseComputedPropertyName(state, context);
                          value = parseMethodDeclaration(state, context, objState);
                      }
                  }
              }
              else if (state.token === 131074 || state.token === 131075) {
                  tokenValue = state.tokenValue;
                  key = parseLiteral(state, context);
                  if (state.token === 8388637)
                      report(state, 119);
                  if (optional(state, context | 32768, 21)) {
                      if (tokenValue === '__proto__') {
                          if (hasProto) {
                              state.pendingCoverInitializeError = 75;
                          }
                          else
                              hasProto = true;
                      }
                      value = acquireGrammar(state, (context | 8192) ^ 8192, 0, parseAssignmentExpression);
                  }
                  else {
                      state.bindable = state.assignable = false;
                      value = parseMethodDeclaration(state, context, objState);
                      objState |= 1;
                  }
              }
              else if (state.token === 131091) {
                  key = parseComputedPropertyName(state, context);
                  objState = (objState & ~(16 | 8 | 768)) | 2;
                  if (state.token === 21) {
                      scanSingleToken(state, context);
                      value = parseAssignmentExpression(state, context | 32768);
                  }
                  else {
                      objState |= 1;
                      if (state.token !== 131083)
                          report(state, 118, '(');
                      state.bindable = state.assignable = false;
                      value = parseMethodDeclaration(state, context, objState);
                  }
              }
              else if (state.token & 21105203) {
                  scanSingleToken(state, context);
                  if (state.token & 274432) {
                      token = state.token;
                      objState &= ~(1 | 16);
                      key = parseIdentifier(state, context);
                      if (state.token === 131083) {
                          state.bindable = state.assignable = false;
                          value = parseMethodDeclaration(state, context, objState | 8);
                          objState |= 1 | 8;
                      }
                      else {
                          if (token === 1060972)
                              report(state, 0);
                          if (token === 12399 || (token & 12400) === 12400)
                              report(state, 0);
                          if (token === 21)
                              report(state, 0);
                          report(state, 0);
                      }
                  }
                  else if (state.token === 131074 || state.token === 131075) {
                      key = parseLiteral(state, context);
                      state.bindable = state.assignable = false;
                      value = parseMethodDeclaration(state, context, objState | 8);
                      objState |= 1;
                  }
                  else if (state.token === 131091) {
                      key = parseComputedPropertyName(state, context);
                      state.bindable = state.assignable = false;
                      value = parseMethodDeclaration(state, context, objState | 8);
                      objState |= 1 | 2;
                  }
                  else {
                      report(state, 1, KeywordDescTable[state.token & 255]);
                  }
              }
              else {
                  report(state, 1, KeywordDescTable[state.token & 255]);
              }
              properties.push(finishNode(state, context, objStart, objLine, objColumn, {
                  type: 'Property',
                  key,
                  value,
                  kind: !(objState & 768) ? 'init' : objState & 512 ? 'set' : 'get',
                  computed: (objState & 2) > 0,
                  method: (objState & 1) > 0,
                  shorthand: (objState & 4) > 0
              }));
          }
          optional(state, context, 18);
      }
      expect(state, context, 536870927);
      state.flags = (state.flags | 32) ^ 32;
      state.bindable = state.bindable && bindable;
      state.assignable = state.assignable && assignable;
      state.pendingCoverInitializeError = pendingCoverInitializeError || state.pendingCoverInitializeError;
      return finishNode(state, context, start, line, column, {
          type: 'ObjectExpression',
          properties
      });
  }
  function parseMethodDeclaration(state, context, objState) {
      const { assignable, bindable, pendingCoverInitializeError } = state;
      state.assignable = state.bindable = false;
      state.bindable = state.assignable = true;
      state.pendingCoverInitializeError = null;
      const result = parsePropertyMethod(state, context | 33554432, objState);
      if (state.pendingCoverInitializeError !== null) {
          report(state, 1, KeywordDescTable[(state.token, 255)]);
      }
      state.bindable = bindable;
      state.assignable = assignable;
      state.pendingCoverInitializeError = pendingCoverInitializeError;
      return result;
  }
  function parsePropertyMethod(state, context, objState) {
      let functionScope = createScope(1);
      let id = null;
      let firstRestricted;
      const { startIndex: start, startLine: line, startColumn: column } = state;
      context =
          ((context |
              262144 |
              4194304 |
              2097152 |
              8388608 |
              ((objState & 64) === 0 ? 16777216 | 524288 : 0)) ^
              (4194304 |
                  2097152 |
                  8388608 |
                  ((objState & 64) < 1 ? 16777216 | 524288 : 0))) |
              (objState & 16 ? 4194304 : 0) |
              (objState & 8 ? 2097152 : 0) |
              (objState & 64 ? 16777216 : 0) |
              67108864 |
              33554432 |
              262144;
      const paramScoop = createSubScope(functionScope, 5);
      const params = parseFormalParameters(state, context, paramScoop, 64, objState);
      const body = parseFunctionBody(state, context, createSubScope(paramScoop, 1), firstRestricted, 0);
      return finishNode(state, context, start, line, column, {
          type: 'FunctionExpression',
          params,
          body,
          async: (objState & 16) > 0,
          generator: (objState & 8) > 0,
          id
      });
  }
  function parseLiteral(state, context) {
      const { tokenRaw: raw, tokenValue: value, startIndex, startLine, startColumn } = state;
      if (context & 1024 && state.flags & 8)
          report(state, 80);
      scanSingleToken(state, context);
      return context & 8
          ? finishNode(state, context, startIndex, startLine, startColumn, {
              type: 'Literal',
              value,
              raw
          })
          : finishNode(state, context, startIndex, startLine, startColumn, {
              type: 'Literal',
              value
          });
  }
  function parseNullOrTrueOrFalseLiteral(state, context) {
      const { token, startIndex, startLine, startColumn } = state;
      const raw = KeywordDescTable[token & 255];
      const value = token === 151559 ? null : raw === 'true';
      scanSingleToken(state, context);
      return context & 8
          ? finishNode(state, context, startIndex, startLine, startColumn, {
              type: 'Literal',
              value,
              raw
          })
          : finishNode(state, context, startIndex, startLine, startColumn, {
              type: 'Literal',
              value
          });
  }
  function parseThisExpression(state, context) {
      const { startIndex, startLine, startColumn } = state;
      scanSingleToken(state, context);
      return finishNode(state, context, startIndex, startLine, startColumn, {
          type: 'ThisExpression'
      });
  }
  function parseIdentifier(state, context) {
      const { tokenRaw: raw, tokenValue: name, startIndex, startLine, startColumn } = state;
      scanSingleToken(state, context);
      return context & 8
          ? finishNode(state, context, startIndex, startLine, startColumn, {
              type: 'Identifier',
              name,
              raw
          })
          : finishNode(state, context, startIndex, startLine, startColumn, {
              type: 'Identifier',
              name
          });
  }
  function parseRegExpLiteral(state, context) {
      const { tokenRegExp: regex, tokenValue: value, startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      return finishNode(state, context, start, line, column, {
          type: 'Literal',
          value,
          regex
      });
  }
  function parseBigIntLiteral(state, context) {
      const { tokenRaw: raw, tokenValue: value, startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      return finishNode(state, context, start, line, column, {
          type: 'Literal',
          value,
          bigint: raw,
          raw
      });
  }
  function parseComputedPropertyName(state, context) {
      expect(state, context | 32768, 131091);
      const key = secludeGrammar(state, (context | 8192) ^ 8192, 0, parseAssignmentExpression);
      expect(state, context, 20);
      return key;
  }

  function parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates) {
      switch (state.token) {
          case 131084:
              return parserObjectAssignmentPattern(state, context, scope, type, origin, verifyDuplicates);
          case 131091:
              return parseArrayAssignmentPattern(state, context, scope, type, origin, verifyDuplicates);
          default:
              return parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
      }
  }
  function parseBindingIdentifier(state, context, scope, type, origin, checkForDuplicates) {
      const { tokenValue: name, token, startIndex, startLine, startColumn } = state;
      if ((token & 274432) === 0 && token !== 126)
          report(state, 113);
      if (context & 1024) {
          if (nameIsArgumentsOrEval(name) || name === 'enum')
              report(state, 112, name);
      }
      else if (name === 'enum')
          report(state, 110);
      validateBindingIdentifier(state, context, type);
      recordTokenValue(state, context, scope, type, origin, checkForDuplicates, (origin === 1 || origin === 2 || origin === 4) &&
          type === 2
          ? true
          : false, name);
      if (origin === 4) {
          addToExportedNamesAndCheckDuplicates(state, state.tokenValue);
          addToExportedBindings(state, state.tokenValue);
      }
      scanSingleToken(state, context | 32768);
      return finishNode(state, context, startIndex, startLine, startColumn, {
          type: 'Identifier',
          name
      });
  }
  function parseAssignmentRestElement(state, context, scope, type, origin, verifyDuplicates) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 14);
      const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
      return finishNode(state, context, start, line, column, {
          type: 'RestElement',
          argument
      });
  }
  function AssignmentRestProperty(state, context, scope, type, origin, verifyDuplicates) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 14);
      const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
      return finishNode(state, context, start, line, column, {
          type: 'RestElement',
          argument
      });
  }
  function parseArrayAssignmentPattern(state, context, scope, type, origin, verifyDuplicates) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 131091);
      const elements = [];
      while (state.token !== 20) {
          if (optional(state, context, 18)) {
              elements.push(null);
          }
          else {
              if (state.token === 14) {
                  elements.push(parseAssignmentRestElement(state, context, scope, type, origin, verifyDuplicates));
                  break;
              }
              else {
                  elements.push(parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates));
              }
              if (state.token !== 20)
                  expect(state, context, 18);
          }
      }
      expect(state, context, 20);
      return finishNode(state, context, start, line, column, {
          type: 'ArrayPattern',
          elements
      });
  }
  function parserObjectAssignmentPattern(state, context, scope, type, origin, verifyDuplicates) {
      const properties = [];
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 131084);
      while (state.token !== 536870927) {
          if (state.token === 14) {
              properties.push(AssignmentRestProperty(state, context, scope, type, origin, verifyDuplicates));
              break;
          }
          properties.push(parseAssignmentProperty(state, context, scope, type, origin, verifyDuplicates));
          if (state.token !== 536870927)
              expect(state, context, 18);
      }
      expect(state, context, 536870927);
      return finishNode(state, context, start, line, column, {
          type: 'ObjectPattern',
          properties
      });
  }
  function parseAssignmentPattern(state, context, left, start, line, column) {
      return finishNode(state, context, start, line, column, {
          type: 'AssignmentPattern',
          left,
          right: secludeGrammar(state, context, 0, parseAssignmentExpression)
      });
  }
  function parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      const left = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
      return !optional(state, context, 8388637)
          ? left
          : finishNode(state, context, start, line, column, {
              type: 'AssignmentPattern',
              left,
              right: secludeGrammar(state, context, 0, parseAssignmentExpression)
          });
  }
  function parseAssignmentProperty(state, context, scope, type, origin, verifyDuplicates) {
      const { token, startIndex: start, startLine: line, startColumn: column } = state;
      let key;
      let value;
      let computed = false;
      let shorthand = false;
      if ((token & 4096) === 4096) {
          const { tokenValue, token } = state;
          key = parseIdentifier(state, context);
          shorthand = !optional(state, context, 21);
          if (shorthand) {
              validateBindingIdentifier(state, context, type, token);
              if (origin === 4) {
                  addToExportedNamesAndCheckDuplicates(state, state.tokenValue);
                  addToExportedBindings(state, state.tokenValue);
              }
              recordTokenValue(state, context, scope, type, origin, false, false, tokenValue);
              const hasInitializer = optional(state, context, 8388637);
              value = hasInitializer ? parseAssignmentPattern(state, context, key, start, line, column) : key;
          }
          else
              value = parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates);
      }
      else {
          if (state.token === 131075 || state.token === 131074) {
              key = parseLiteral(state, context);
          }
          else if (state.token === 131091) {
              computed = true;
              key = parseComputedPropertyName(state, context);
          }
          else
              key = parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
          expect(state, context, 21);
          value = parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates);
      }
      return finishNode(state, context, start, line, column, {
          type: 'Property',
          kind: 'init',
          key,
          computed,
          value,
          method: false,
          shorthand
      });
  }

  function parseClassDeclaration(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      context = (context | 1024 | 16777216) ^ 16777216;
      let id = null;
      let superClass = null;
      if (state.token & 274432 && state.token !== 20564) {
          validateBindingIdentifier(state, context | 1024, 16);
          recordTokenValueAndDeduplicate(state, context, scope, 4, 0, true, state.tokenValue);
          id = parseIdentifier(state, context);
      }
      else if (!(context & 512))
          report(state, 111, 'Class');
      if (optional(state, context, 20564)) {
          superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
          context |= 524288;
      }
      else
          context = (context | 524288) ^ 524288;
      const body = parseClassBodyAndElementList(state, context | 1024, 256);
      return finishNode(state, context, start, line, column, {
          type: 'ClassDeclaration',
          id,
          superClass,
          body
      });
  }
  function parseFunctionDeclaration(state, context, scope, origin, isAsync) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      const isGenerator = (origin & 1) < 1 && optional(state, context, 21105203);
      let funcScope = createScope(1);
      let id = null;
      let firstRestricted;
      if (state.token & 274432 || state.token === 126) {
          validateBindingIdentifier(state, ((context | (2097152 | 4194304)) ^ (2097152 | 4194304)) |
              (context & 1024 ? 2097152 : context & 2097152 ? 2097152 : 0) |
              (context & 2048 ? 4194304 : context & 4194304 ? 4194304 : 0), context & 4096 && (context & 2048) < 1 ? 2 : 4);
          if (origin & 1) {
              scope = createSubScope(scope, 1);
          }
          addFunctionName(state, context, scope, context & 4096 && (context & 2048) < 1 ? 2 : 4, origin, true);
          funcScope = createSubScope(funcScope, 1);
          firstRestricted = state.tokenValue;
          id = parseIdentifier(state, context);
      }
      else if (!(context & 512))
          report(state, 111, 'Function');
      context =
          ((context |
              4194304 |
              2097152 |
              8388608 |
              262144 |
              524288 |
              16777216) ^
              (4194304 |
                  2097152 |
                  8388608 |
                  262144 |
                  524288 |
                  16777216)) |
              (isAsync ? 4194304 : 0) |
              (isGenerator ? 2097152 : 0) |
              67108864;
      const paramScoop = createSubScope(funcScope, 5);
      const params = parseFormalParameters(state, context, paramScoop, 64, 0);
      const body = parseFunctionBody(state, context, createSubScope(paramScoop, 1), firstRestricted, origin);
      return finishNode(state, context, start, line, column, {
          type: 'FunctionDeclaration',
          params,
          body,
          async: (context & 4194304) > 0,
          generator: isGenerator,
          id
      });
  }
  function parseHostedClassDeclaration(state, context, scope, isNotDefault) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      context = (context | 1024 | 16777216) ^ (1024 | 16777216);
      let id = null;
      let superClass = null;
      let name = '';
      if (state.token & 274432 && state.token !== 20564) {
          name = state.tokenValue;
          validateBindingIdentifier(state, context, 16);
          recordTokenValueAndDeduplicate(state, context, scope, 4, 0, true, name);
          id = parseIdentifier(state, context);
      }
      else if (!(context & 512))
          report(state, 111, 'Class');
      if (isNotDefault)
          addToExportedNamesAndCheckDuplicates(state, name);
      addToExportedBindings(state, name);
      if (optional(state, context, 20564)) {
          superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
          context |= 524288;
      }
      else
          context = (context | 524288) ^ 524288;
      context |= 262144;
      const body = parseClassBodyAndElementList(state, context, 256);
      return finishNode(state, context, start, line, column, {
          type: 'ClassDeclaration',
          id,
          superClass,
          body
      });
  }
  function parseHoistableFunctionDeclaration(state, context, scope, origin, isAsync) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      const isGenerator = optional(state, context, 21105203);
      let funcScope = createScope(1);
      let id = null;
      let name = '';
      if (state.token & 274432) {
          name = state.tokenValue;
          validateBindingIdentifier(state, context, 4);
          addFunctionName(state, context, scope, 4, 0, true);
          funcScope = createSubScope(funcScope, 1);
          id = parseIdentifier(state, context);
      }
      else if (!(context & 512))
          report(state, 111, 'Function');
      if ((origin & 8) === 0)
          addToExportedNamesAndCheckDuplicates(state, name);
      addToExportedBindings(state, name);
      context =
          ((context | 4194304 | 2097152 | 8388608 | 262144) ^
              (4194304 | 2097152 | 8388608 | 262144)) |
              (isAsync ? 4194304 : 0) |
              (isGenerator ? 2097152 : 0) |
              67108864;
      const paramScoop = createSubScope(funcScope, 5);
      const params = parseFormalParameters(state, context, paramScoop, 64, 0);
      const body = parseFunctionBody(state, context, createSubScope(paramScoop, 1), undefined, 0);
      return finishNode(state, context, start, line, column, {
          type: 'FunctionDeclaration',
          params,
          body,
          async: (context & 4194304) > 0,
          generator: isGenerator,
          id
      });
  }
  function parseLexicalDeclaration(state, context, type, origin, scope) {
      const { token, startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
      if (checkIfLexicalAlreadyBound(state, context, scope, origin, false)) {
          report(state, 108, KeywordDescTable[token & 255]);
      }
      consumeSemicolon(state, context);
      return finishNode(state, context, start, line, column, {
          type: 'VariableDeclaration',
          kind: KeywordDescTable[token & 255],
          declarations
      });
  }
  function parseVariableDeclarationList(state, context, type, origin, checkDuplicates, scope) {
      let bindingCount = 1;
      const list = [
          parseVariableDeclaration(state, context, type, origin, checkDuplicates, scope)
      ];
      while (optional(state, context, 18)) {
          list.push(parseVariableDeclaration(state, context, type, origin, checkDuplicates, scope));
          ++bindingCount;
      }
      if (origin & 2 && isInOrOf(state) && bindingCount > 1) {
          report(state, 91, KeywordDescTable[state.token & 255]);
      }
      return list;
  }
  function isInOrOf(state) {
      return state.token === 33707825 || state.token === 12402;
  }
  function parseVariableDeclaration(state, context, type, origin, checkDuplicates, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      const isBinding = state.token === 131084 || state.token === 131091;
      const id = parseBindingIdentifierOrPattern(state, context, scope, type, origin, checkDuplicates);
      let init = null;
      if (optional(state, context | 32768, 8388637)) {
          init = secludeGrammar(state, context, 0, parseAssignmentExpression);
          if (origin & 2 || isBinding) {
              if (state.token === 33707825) {
                  if (isBinding ||
                      ((type & 2) < 1 || ((context & 16) === 0 || context & 1024))) {
                      report(state, 89);
                  }
              }
              else if (state.token === 12402)
                  report(state, 89);
          }
      }
      else if ((type & 8 || isBinding) && !isInOrOf(state)) {
          report(state, 90, type & 8 ? 'const' : 'destructuring');
      }
      return finishNode(state, context, start, line, column, {
          type: 'VariableDeclarator',
          init,
          id
      });
  }

  function parseStatementList(state, context, scope) {
      const statements = [];
      while (state.token === 131075) {
          if (state.index - state.startIndex < 13 && state.tokenValue === 'use strict')
              context |= 1024;
          statements.push(parseDirective(state, context, scope));
      }
      while (state.token !== 536870912)
          statements.push(parseStatementListItem(state, context, scope));
      return statements;
  }
  function parseStatementListItem(state, context, scope) {
      state.assignable = state.bindable = true;
      switch (state.token) {
          case 20563:
              report(state, 98, KeywordDescTable[state.token & 255]);
          case 151641:
              return (context & 1) !== 0
                  ? parseStatement(state, (context | 4096) ^ 4096, scope, true)
                  : report(state, 98, KeywordDescTable[state.token & 255]);
          case 151639:
              return parseFunctionDeclaration(state, context, scope, 256, false);
          case 151629:
              return parseClassDeclaration(state, context, scope);
          case 402804809:
              return parseLexicalDeclaration(state, context, 8, 1, scope);
          case 402821192:
              return parseLetOrExpressionStatement(state, context, scope);
          case 1060972:
              return parseAsyncFunctionOrExpressionStatement(state, context, scope);
          default:
              return parseStatement(state, (context | 4096) ^ 4096, scope, true);
      }
  }
  function parseAsyncFunctionOrExpressionStatement(state, context, scope) {
      return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
          ? parseFunctionDeclaration(state, context, scope, 2048, true)
          : parseExpressionOrLabelledStatement(state, context, scope, false);
  }
  function parseLetOrExpressionStatement(state, context, scope) {
      return lookAheadOrScan(state, context, isLexical, true)
          ? parseLexicalDeclaration(state, context, 4, 1, scope)
          : parseExpressionOrLabelledStatement(state, context, scope, false);
  }
  function parseStatement(state, context, scope, allowFunctionDeclarationAsStatement) {
      const { token } = state;
      if ((token & 274432) === 274432 ||
          (token & 12288) === 12288 ||
          (token & 2097152) === 2097152 ||
          token === 121 ||
          token === 126) {
          if ((token & 1048576) === 1048576) {
              if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
                  report(state, 64);
              }
          }
          return parseExpressionOrLabelledStatement(state, context, scope, allowFunctionDeclarationAsStatement);
      }
      if ((token & 4096) === 4096) {
          switch (token) {
              case 268587079:
                  return parseVariableStatement(state, context, 2, 1, scope);
              case 151645:
                  return parseSwitchStatement(state, context, scope);
              case 20561:
                  return parseDoWhileStatement(state, context, scope);
              case 20571:
                  return parseReturnStatement(state, context);
              case 20577:
                  return parseWhileStatement(state, context, scope);
              case 20578:
                  return parseWithStatement(state, context, scope);
              case 20554:
                  return parseBreakStatement(state, context);
              case 20558:
                  return parseContinueStatement(state, context);
              case 20559:
                  return parseDebuggerStatement(state, context);
              case 20576:
                  return parseTryStatement(state, context, scope);
              case 151647:
                  return parseThrowStatement(state, context);
              case 20568:
                  return parseIfStatement(state, context, scope);
              case 20566:
                  return parseForStatement(state, context, scope);
              case 151639:
                  report(state, context & 1024
                      ? 33
                      : (context & 16) === 0
                          ? 121
                          : 32);
              case 151629:
                  report(state, 63, KeywordDescTable[token & 255]);
              default:
          }
      }
      switch (token) {
          case 536870929:
              return parseEmptyStatement(state, context);
          case 131084:
              return parseBlockStatement(state, (context | 4096) ^ 4096, createSubScope(scope, 1));
          default:
              return parseExpressionStatement(state, context);
      }
  }
  function parseExpressionStatement(state, context) {
      const { startIndex, startColumn, startLine } = state;
      const expr = parseExpressions(state, (context | 8192) ^ 8192);
      consumeSemicolon(state, context);
      return finishNode(state, context, startIndex, startLine, startColumn, {
          type: 'ExpressionStatement',
          expression: expr
      });
  }
  function parseBlockStatement(state, context, scope) {
      const body = [];
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context | 32768, 131084);
      while (state.token !== 536870927) {
          body.push(parseStatementListItem(state, context, scope));
      }
      expect(state, context | 32768, 536870927);
      return finishNode(state, context, start, line, column, {
          type: 'BlockStatement',
          body
      });
  }
  function parseEmptyStatement(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'EmptyStatement'
      });
  }
  function parseThrowStatement(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      if (state.flags & 1)
          report(state, 43);
      const argument = parseExpressions(state, (context | 8192) ^ 8192);
      consumeSemicolon(state, context);
      return finishNode(state, context, start, line, column, {
          type: 'ThrowStatement',
          argument
      });
  }
  function parseIfStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      expect(state, context | 32768, 131083);
      const test = parseExpressions(state, (context | 8192) ^ 8192);
      expect(state, context | 32768, 16);
      const consequent = parseConsequentOrAlternate(state, context, scope);
      const alternate = optional(state, context | 32768, 20562)
          ? parseConsequentOrAlternate(state, context, scope)
          : null;
      return finishNode(state, context, start, line, column, {
          type: 'IfStatement',
          test,
          consequent,
          alternate
      });
  }
  function parseConsequentOrAlternate(state, context, scope) {
      return context & 1024 || (context & 16) === 0 || state.token !== 151639
          ? parseStatement(state, (context | 4096) ^ 4096, scope, false)
          : parseFunctionDeclaration(state, context, scope, 1, false);
  }
  function parseSwitchStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      expect(state, context | 32768, 131083);
      const discriminant = parseExpressions(state, (context | 8192) ^ 8192);
      expect(state, context | 32768, 16);
      expect(state, context | 32768, 131084);
      const cases = [];
      let seenDefault = false;
      const switchScope = createSubScope(scope, 3);
      const previousSwitchStatement = state.switchStatement;
      state.switchStatement = 1;
      while (state.token !== 536870927) {
          let test = null;
          const { startIndex: subStart, startLine: subLine, startColumn: subColumn } = state;
          if (optional(state, context, 20555)) {
              test = parseExpressions(state, (context | 8192) ^ 8192);
          }
          else {
              expect(state, context, 20560);
              if (seenDefault)
                  report(state, 114);
              seenDefault = true;
          }
          cases.push(parseCaseOrDefaultClauses(state, context, test, switchScope, subStart, subLine, subColumn));
      }
      state.switchStatement = previousSwitchStatement;
      expect(state, context | 32768, 536870927);
      return finishNode(state, context, start, line, column, {
          type: 'SwitchStatement',
          discriminant,
          cases
      });
  }
  function parseReturnStatement(state, context) {
      if ((context & (64 | 134217728)) < 1)
          report(state, 44);
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      const argument = (state.token & 536870912) < 1 && (state.flags & 1) < 1
          ? parseExpressions(state, (context | 8192) ^ (8192 | 134217728))
          : null;
      consumeSemicolon(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'ReturnStatement',
          argument
      });
  }
  function parseWhileStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      expect(state, context | 32768, 131083);
      const test = parseExpressions(state, (context | 8192) ^ 8192);
      expect(state, context | 32768, 16);
      const previousIterationStatement = state.iterationStatement;
      state.iterationStatement = 1;
      const body = parseStatement(state, (context | 4096) ^ 4096, scope, false);
      state.iterationStatement = previousIterationStatement;
      return finishNode(state, context, start, line, column, {
          type: 'WhileStatement',
          test,
          body
      });
  }
  function parseContinueStatement(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      let label = null;
      if (!(state.flags & 1) && state.token & 4096) {
          const tokenValue = state.tokenValue;
          label = parseIdentifier(state, context | 32768);
          validateContinueLabel(state, tokenValue);
      }
      consumeSemicolon(state, context | 32768);
      if (label === null && state.iterationStatement === 0 && state.switchStatement === 0) {
          report(state, 39);
      }
      return finishNode(state, context, start, line, column, {
          type: 'ContinueStatement',
          label
      });
  }
  function parseBreakStatement(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      let label = null;
      if (!(state.flags & 1) && state.token & 4096) {
          const tokenValue = state.tokenValue;
          label = parseIdentifier(state, context | 32768);
          validateBreakStatement(state, tokenValue);
      }
      else if (state.iterationStatement === 0 && state.switchStatement === 0) {
          report(state, 40);
      }
      consumeSemicolon(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'BreakStatement',
          label
      });
  }
  function parseWithStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      if (context & 1024)
          report(state, 41);
      scanSingleToken(state, context);
      expect(state, context | 32768, 131083);
      const object = parseExpressions(state, (context | 8192) ^ 8192);
      expect(state, context | 32768, 16);
      const body = parseStatement(state, (context | 4096) ^ 4096, scope, false);
      return finishNode(state, context, start, line, column, {
          type: 'WithStatement',
          object,
          body
      });
  }
  function parseDebuggerStatement(state, context) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      consumeSemicolon(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'DebuggerStatement'
      });
  }
  function parseTryStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context | 32768);
      const block = parseBlockStatement(state, context | 32768, createSubScope(scope, 1));
      const handler = optional(state, context | 32768, 20556)
          ? parseCatchBlock(state, context, scope)
          : null;
      const finalizer = optional(state, context | 32768, 20565)
          ? parseBlockStatement(state, (context | 4096) ^ 4096, createSubScope(scope, 1))
          : null;
      if (!handler && !finalizer)
          report(state, 115);
      return finishNode(state, context, start, line, column, {
          type: 'TryStatement',
          block,
          handler,
          finalizer
      });
  }
  function parseCatchBlock(state, context, scope) {
      let param = null;
      let secondScope = scope;
      const { startIndex: start, startLine: line, startColumn: column } = state;
      if (optional(state, context | 32768, 131083)) {
          const catchScope = createSubScope(scope, 4);
          param = parseBindingIdentifierOrPattern(state, context, catchScope, 1, 16, false);
          if (checkIfLexicalAlreadyBound(state, context, catchScope, 0, true))
              report(state, 34, state.tokenValue);
          expect(state, context, 16);
          secondScope = createSubScope(catchScope, 1);
      }
      const body = parseBlockStatement(state, context, secondScope);
      return finishNode(state, context, start, line, column, {
          type: 'CatchClause',
          param,
          body
      });
  }
  function parseDoWhileStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context | 32768, 20561);
      const previousIterationStatement = state.iterationStatement;
      state.iterationStatement = 1;
      const body = parseStatement(state, (context | 4096) ^ 4096, scope, false);
      state.iterationStatement = previousIterationStatement;
      expect(state, context, 20577);
      expect(state, context | 32768, 131083);
      const test = parseExpressions(state, (context | 8192) ^ 8192);
      expect(state, context | 32768, 16);
      optional(state, context | 32768, 536870929);
      return finishNode(state, context, start, line, column, {
          type: 'DoWhileStatement',
          body,
          test
      });
  }
  function parseCaseOrDefaultClauses(state, context, test, scope, start, line, column) {
      expect(state, context, 21);
      const consequent = [];
      while (state.token !== 20555 &&
          state.token !== 536870927 &&
          state.token !== 20560) {
          consequent.push(parseStatementListItem(state, (context | 4096) ^ 4096, scope));
      }
      return finishNode(state, context, start, line, column, {
          type: 'SwitchCase',
          test,
          consequent
      });
  }
  function parseForStatement(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      const forAwait = context & 4194304 ? optional(state, context, 667757) : false;
      scope = createSubScope(scope, 2);
      expect(state, context | 32768, 131083);
      let init = null;
      let declarations = null;
      let test = null;
      let update = null;
      let sequencePos = null;
      let sequenceLine = null;
      let sequenceColumn = null;
      let right;
      let isPattern = false;
      if (state.token !== 536870929) {
          if ((state.token & 268435456) > 0) {
              const kind = KeywordDescTable[state.token & 255];
              const { startIndex: varStart, startLine: varLine, startColumn: varColumn } = state;
              if (optional(state, context, 268587079)) {
                  init = finishNode(state, context, varStart, varLine, varColumn, {
                      type: 'VariableDeclaration',
                      kind,
                      declarations: parseVariableDeclarationList(state, context | 8192, 2, 2, false, scope)
                  });
              }
              else if (state.token === 402821192) {
                  if (lookAheadOrScan(state, context, isLexical, false)) {
                      init = finishNode(state, context, varStart, varLine, varColumn, {
                          type: 'VariableDeclaration',
                          kind,
                          declarations: parseVariableDeclarationList(state, context, 4, 2, true, scope)
                      });
                  }
                  else if (context & 1024) {
                      report(state, 0);
                  }
                  else {
                      isPattern = state.token === 131091 || state.token === 131084;
                      init = acquireGrammar(state, context | 8192, 0, parseAssignmentExpression);
                  }
              }
              else if (optional(state, context, 402804809)) {
                  declarations = parseVariableDeclarationList(state, context, 8, 2, false, scope);
                  if (checkIfLexicalAlreadyBound(state, context, scope, 0, true))
                      report(state, 34, state.tokenValue);
                  init = finishNode(state, context, varStart, varLine, varColumn, {
                      type: 'VariableDeclaration',
                      kind,
                      declarations
                  });
              }
          }
          else {
              sequencePos = state.startIndex;
              sequenceLine = state.startLine;
              sequenceColumn = state.startColumn;
              isPattern = state.token === 131091 || state.token === 131084;
              init = acquireGrammar(state, context | 8192, 0, parseAssignmentExpression);
          }
      }
      if (optional(state, context | 32768, 12402)) {
          if (isPattern) {
              if (!state.assignable || init.type === 'AssignmentExpression') {
                  report(state, 77, 'of');
              }
              reinterpret(state, init);
          }
          right = parseAssignmentExpression(state, (context | 8192) ^ 8192);
          expect(state, context | 32768, 16);
          const previousIterationStatement = state.iterationStatement;
          state.iterationStatement = 1;
          const body = parseStatement(state, (context | 4096) ^ 4096, scope, false);
          state.iterationStatement = previousIterationStatement;
          return finishNode(state, context, start, line, column, {
              type: 'ForOfStatement',
              body,
              left: init,
              right,
              await: forAwait
          });
      }
      if (forAwait)
          report(state, 120);
      if (optional(state, context, 33707825)) {
          if (isPattern) {
              if (!state.assignable || init.type === 'AssignmentExpression') {
                  if (context & 1024 || (context & 16) === 0) {
                      report(state, 77, 'in');
                  }
              }
              reinterpret(state, init);
          }
          right = parseExpressions(state, (context | 8192) ^ 8192);
          expect(state, context | 32768, 16);
          const previousIterationStatement = state.iterationStatement;
          state.iterationStatement = 1;
          const body = parseStatement(state, (context | 4096) ^ 4096, scope, false);
          state.iterationStatement = previousIterationStatement;
          return finishNode(state, context, start, line, column, {
              type: 'ForInStatement',
              body,
              left: init,
              right
          });
      }
      if (state.token === 18) {
          init = parseSequenceExpression(state, (context | 8192) ^ 8192, init, sequencePos, sequenceLine, sequenceColumn);
      }
      if (state.token === 33707825) {
          report(state, 0);
      }
      if (state.token === 12402) {
          report(state, 0);
      }
      expect(state, context | 32768, 536870929);
      if (state.token !== 536870929)
          test = parseExpressions(state, context);
      expect(state, context | 32768, 536870929);
      if (state.token !== 16)
          update = parseExpressions(state, (context | 8192) ^ 8192);
      expect(state, context | 32768, 16);
      const previousIterationStatement = state.iterationStatement;
      state.iterationStatement = 1;
      const body = parseStatement(state, (context | 4096) ^ 4096, scope, false);
      state.iterationStatement = previousIterationStatement;
      return finishNode(state, context, start, line, column, {
          type: 'ForStatement',
          body,
          init,
          test,
          update
      });
  }
  function parseExpressionOrLabelledStatement(state, context, scope, allowFunctionDeclarationAsStatement) {
      const { token, tokenValue, startIndex: start, startLine: line, startColumn: column } = state;
      const expr = parseExpressions(state, (context | 8192) ^ 8192);
      if ((token & 4096 || 126) && state.token === 21) {
          scanSingleToken(state, context | 32768);
          validateBindingIdentifier(state, context, 0, token);
          if (getLabel(state, `@${tokenValue}`, false, true)) {
              report(state, 42, tokenValue);
          }
          addLabel(state, tokenValue);
          let body = null;
          if ((context & 1024) === 0 &&
              context & 16 &&
              allowFunctionDeclarationAsStatement &&
              state.token === 151639) {
              body = parseFunctionDeclaration(state, context, scope, 1, false);
          }
          else
              body = parseStatement(state, (context | 4096) ^ 4096, scope, allowFunctionDeclarationAsStatement);
          state.labelDepth--;
          return finishNode(state, context, start, line, column, {
              type: 'LabeledStatement',
              label: expr,
              body
          });
      }
      consumeSemicolon(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'ExpressionStatement',
          expression: expr
      });
  }
  function parseDirective(state, context, scope) {
      if ((context & 131072) < 1)
          return parseStatementListItem(state, context, scope);
      const { startIndex, tokenRaw, startLine, startColumn } = state;
      const expression = parseExpressions(state, context);
      consumeSemicolon(state, context | 32768);
      return finishNode(state, context, startIndex, startLine, startColumn, {
          type: 'ExpressionStatement',
          expression,
          directive: tokenRaw.slice(1, -1)
      });
  }
  function parseVariableStatement(state, context, type, origin, scope) {
      const { token, startIndex: start, startLine: line, startColumn: column } = state;
      scanSingleToken(state, context);
      const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
      consumeSemicolon(state, context | 32768);
      return finishNode(state, context, start, line, column, {
          type: 'VariableDeclaration',
          kind: KeywordDescTable[token & 255],
          declarations
      });
  }

  function parseModuleItem(state, context, scope) {
      const statements = [];
      while (state.token === 131075) {
          if (state.index - state.startIndex < 13 && state.tokenValue === 'use strict') {
              context |= 1024;
          }
          statements.push(parseDirective(state, context, scope));
      }
      while (state.token !== 536870912) {
          statements.push(parseModuleItemList(state, context, scope));
      }
      return statements;
  }
  function parseModuleItemList(state, context, scope) {
      state.assignable = state.bindable = true;
      switch (state.token) {
          case 20563:
              return parseExportDeclaration(state, context, scope);
          case 151641:
              if (!(context & 1 && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true))) {
                  return parseImportDeclaration(state, context, scope);
              }
          default:
              return parseStatementListItem(state, context, scope);
      }
  }
  function parseExportDeclaration(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 20563);
      const specifiers = [];
      let declaration = null;
      let source = null;
      if (optional(state, context | 32768, 20560)) {
          switch (state.token) {
              case 151639: {
                  declaration = parseHoistableFunctionDeclaration(state, context | 512, scope, 8, false);
                  break;
              }
              case 151629:
                  declaration = parseHostedClassDeclaration(state, context | 512, scope, true);
                  break;
              case 1060972:
                  declaration = parseAsyncFunctionOrAssignmentExpression(state, context | 512, scope, 8);
                  break;
              default:
                  declaration = parseAssignmentExpression(state, context);
                  consumeSemicolon(state, context);
          }
          addToExportedNamesAndCheckDuplicates(state, 'default');
          addToExportedBindings(state, '*default*');
          recordTokenValue(state, context, scope, 0, 0, true, false, '*default*');
          return finishNode(state, context, start, line, column, {
              type: 'ExportDefaultDeclaration',
              declaration
          });
      }
      switch (state.token) {
          case 21105203: {
              scanSingleToken(state, context);
              if (context & 128 && optional(state, context, 16920683)) {
                  recordTokenValueAndDeduplicate(state, context, scope, 0, 0, false, state.tokenValue);
                  specifiers.push(finishNode(state, context, state.startIndex, state.startLine, state.startColumn, {
                      type: 'ExportNamespaceSpecifier',
                      specifier: parseIdentifier(state, context)
                  }));
              }
              expect(state, context, 12401);
              if (state.token !== 131075)
                  report(state, 97, 'Export');
              source = parseLiteral(state, context);
              consumeSemicolon(state, context);
              return context & 128 && specifiers
                  ? finishNode(state, context, start, line, column, {
                      type: 'ExportNamedDeclaration',
                      source,
                      specifiers
                  })
                  : finishNode(state, context, start, line, column, {
                      type: 'ExportAllDeclaration',
                      source
                  });
          }
          case 131084: {
              const exportedNames = [];
              const exportedBindings = [];
              expect(state, context, 131084);
              while (state.token & 274432) {
                  const tokenValue = state.tokenValue;
                  const local = parseIdentifier(state, context);
                  let exported;
                  if (state.token === 16920683) {
                      scanSingleToken(state, context);
                      if ((state.token & 274432) === 0)
                          report(state, 94);
                      exportedNames.push(state.tokenValue);
                      exportedBindings.push(tokenValue);
                      exported = parseIdentifier(state, context);
                  }
                  else {
                      exportedNames.push(state.tokenValue);
                      exportedBindings.push(state.tokenValue);
                      exported = local;
                  }
                  specifiers.push(finishNode(state, context, start, line, column, {
                      type: 'ExportSpecifier',
                      local,
                      exported
                  }));
                  if (state.token !== 536870927)
                      expect(state, context, 18);
              }
              expect(state, context, 536870927);
              if (optional(state, context, 12401)) {
                  if (state.token !== 131075)
                      report(state, 97, 'Export');
                  source = parseLiteral(state, context);
              }
              else {
                  let i = 0;
                  let iMax = exportedNames.length;
                  for (; i < iMax; i++) {
                      addToExportedNamesAndCheckDuplicates(state, exportedNames[i]);
                  }
                  i = 0;
                  iMax = exportedBindings.length;
                  for (; i < iMax; i++) {
                      addToExportedBindings(state, exportedBindings[i]);
                  }
              }
              consumeSemicolon(state, context);
              break;
          }
          case 151629:
              declaration = parseHostedClassDeclaration(state, context, scope, false);
              break;
          case 402821192:
              declaration = parseLexicalDeclaration(state, context, 4, 4, scope);
              if (checkIfLexicalAlreadyBound(state, context, scope, 0, false))
                  report(state, 95, 'let');
              break;
          case 402804809:
              declaration = parseLexicalDeclaration(state, context, 8, 4, scope);
              if (checkIfLexicalAlreadyBound(state, context, scope, 0, false))
                  report(state, 95, 'const');
              break;
          case 268587079:
              declaration = parseVariableStatement(state, context, 2, 4, scope);
              break;
          case 151639:
              declaration = parseHoistableFunctionDeclaration(state, context, scope, 4, false);
              break;
          case 1060972:
              scanSingleToken(state, context);
              if ((state.flags & 1) === 0 && state.token === 151639) {
                  declaration = parseHoistableFunctionDeclaration(state, context, scope, 4, true);
                  break;
              }
          default:
              report(state, 1, KeywordDescTable[state.token & 255]);
      }
      return finishNode(state, context, start, line, column, {
          type: 'ExportNamedDeclaration',
          source,
          specifiers,
          declaration
      });
  }
  function parseImportDeclaration(state, context, scope) {
      const { startIndex: start, startLine: line, startColumn: column } = state;
      expect(state, context, 151641);
      let source;
      const specifiers = [];
      if (state.token & 274432) {
          validateBindingIdentifier(state, context, 8);
          recordTokenValueAndDeduplicate(state, context, scope, 0, 0, false, state.tokenValue);
          specifiers.push(finishNode(state, context, start, line, column, {
              type: 'ImportDefaultSpecifier',
              local: parseIdentifier(state, context)
          }));
          if (optional(state, context, 18)) {
              if (state.token === 21105203) {
                  parseImportNamespace(state, context, scope, start, line, column, specifiers);
              }
              else if (state.token === 131084) {
                  parseImportSpecifierOrNamedImports(state, context, scope, start, line, column, specifiers);
              }
              else
                  report(state, 96);
          }
          source = parseModuleSpecifier(state, context);
      }
      else if (state.token === 131075) {
          source = parseLiteral(state, context);
      }
      else {
          if (state.token === 21105203) {
              parseImportNamespace(state, context, scope, start, line, column, specifiers);
          }
          else if (state.token === 131084) {
              parseImportSpecifierOrNamedImports(state, context, scope, start, line, column, specifiers);
          }
          else
              report(state, 1, KeywordDescTable[state.token & 255]);
          source = parseModuleSpecifier(state, context);
      }
      consumeSemicolon(state, context);
      return finishNode(state, context, start, line, column, {
          type: 'ImportDeclaration',
          specifiers,
          source
      });
  }
  function parseImportSpecifierOrNamedImports(state, context, scope, start, line, column, specifiers) {
      expect(state, context, 131084);
      while (state.token & 274432) {
          const { token, tokenValue } = state;
          const imported = parseIdentifier(state, context);
          let local;
          if (optional(state, context, 16920683)) {
              if ((state.token & 274432) === 0)
                  report(state, 94);
              validateBindingIdentifier(state, context, 8);
              recordTokenValueAndDeduplicate(state, context, scope, 8, 0, false, state.tokenValue);
              local = parseIdentifier(state, context);
          }
          else {
              validateBindingIdentifier(state, context, 8, token);
              recordTokenValueAndDeduplicate(state, context, scope, 8, 0, false, tokenValue);
              local = imported;
          }
          specifiers.push(finishNode(state, context, start, line, column, {
              type: 'ImportSpecifier',
              local,
              imported
          }));
          if (state.token !== 536870927)
              expect(state, context, 18);
      }
      expect(state, context, 536870927);
  }
  function parseImportNamespace(state, context, scope, start, line, column, specifiers) {
      scanSingleToken(state, context);
      expect(state, context, 16920683);
      validateBindingIdentifier(state, context, 8);
      recordTokenValue(state, context, scope, 8, 0, true, false, state.tokenValue);
      const local = parseIdentifier(state, context);
      specifiers.push(finishNode(state, context, start, line, column, {
          type: 'ImportNamespaceSpecifier',
          local
      }));
  }
  function parseModuleSpecifier(state, context) {
      expect(state, context, 12401);
      if (state.token !== 131075)
          report(state, 97, 'Import');
      return parseLiteral(state, context);
  }
  function parseAsyncFunctionOrAssignmentExpression(state, context, scope, origin) {
      return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
          ? parseHoistableFunctionDeclaration(state, context, scope, origin, true)
          : parseAssignmentExpression(state, context);
  }

  const version = '2.0';
  function parseSource(source, options, context) {
      let onComment;
      let onToken;
      if (options != null) {
          if (options.ecmaVersion) {
              let ecmaVersion = options.ecmaVersion || 10;
              options.ecmaVersion = (ecmaVersion > 2009 ? ecmaVersion - 2009 : ecmaVersion);
          }
          if (options.module)
              context |= 2048;
          if (options.parenthesizedExpr)
              context |= 1073741824;
          if (options.next)
              context |= 1;
          if (options.jsx)
              context |= 4;
          if (options.ranges)
              context |= 2;
          if (options.loc)
              context |= 32;
          if (options.raw)
              context |= 8;
          if (options.globalReturn)
              context |= 64;
          if (options.globalAwait)
              context |= 536870912;
          if (options.impliedStrict)
              context |= 1024;
          if (options.experimental)
              context |= 128;
          if (options.native)
              context |= 256;
          if (options.webCompat)
              context |= 16;
          if (options.next)
              context |= 1;
          if (options.ranges)
              context |= 2;
          if (options.directives)
              context |= 131072 | 8;
          if (options.raw)
              context |= 8;
          if (options.onComment != null) {
              onComment = Array.isArray(options.onComment) ? pushComment(context, options.onComment) : options.onComment;
          }
          if (options.onToken != null) {
              onToken = Array.isArray(options.onToken) ? pushToken(context, options.onToken) : options.onToken;
          }
      }
      const state = create(source, onComment, onToken);
      skipHashBang(state, context);
      const scope = createScope(1);
      let body;
      scanSingleToken(state, context | 32768);
      if (context & 268435456) {
          return parseExpressions(state, context);
      }
      else if (context & 2048) {
          body = parseModuleItem(state, context | 4096, scope);
          for (const key in state.exportedBindings) {
              if (key[0] === '@' && key !== '#default' && (scope.var[key] === undefined && scope.lex[key] === undefined)) {
                  report(state, 36, key.slice(1));
              }
          }
      }
      else {
          body = parseStatementList(state, context | 4096, scope);
      }
      const node = {
          type: 'Program',
          sourceType: context & 2048 ? 'module' : 'script',
          body
      };
      if (context & 2) {
          node.start = 0;
          node.end = source.length;
      }
      if (context & 32) {
          node.loc = {
              start: { line: 1, column: 0 },
              end: { line: state.line, column: state.column }
          };
      }
      return node;
  }
  function parse(source, options) {
      return parseSource(source, options, options && options.module ? 1024 | 2048 : 0);
  }
  function parseScript(source, options) {
      return parseSource(source, options, 0);
  }
  function parseModule(source, options) {
      return parseSource(source, options, 1024 | 2048);
  }
  function parseExpression(source, options) {
      return parseSource(source, options, options && options.module ? 268435456 | 1024 | 2048 : 268435456);
  }

  exports.version = version;
  exports.parseSource = parseSource;
  exports.parse = parse;
  exports.parseScript = parseScript;
  exports.parseModule = parseModule;
  exports.parseExpression = parseExpression;

  return exports;

}({}));

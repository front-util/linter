import { describe, expect, it } from 'bun:test';

import { configs } from '../src/index.js';

describe('strict presets', () => {
    it('should export configs.strict', () => {
        expect(configs.strict).toBeDefined();
        expect(Array.isArray(configs.strict)).toBe(true);
    });

    it('should export configs.strict-ts', () => {
        expect(configs['strict-ts']).toBeDefined();
        expect(Array.isArray(configs['strict-ts'])).toBe(true);
    });

    it('should export configs.strict-react', () => {
        expect(configs['strict-react']).toBeDefined();
        expect(Array.isArray(configs['strict-react'])).toBe(true);
    });

    it('strict should have more rules than js', () => {
        const jsRules = extractRules(configs.js);
        const strictRules = extractRules(configs.strict);

        expect(strictRules.size).toBeGreaterThan(jsRules.size);
    });

    it('strict-ts should have more rules than ts', () => {
        const tsRules = extractRules(configs.ts);
        const strictTsRules = extractRules(configs['strict-ts']);

        expect(strictTsRules.size).toBeGreaterThan(tsRules.size);
    });
});

function extractRules(config: unknown[]): Set<string> {
    const rules = new Set<string>();

    for(const block of config) {
        if(block && typeof block === 'object' && 'rules' in block) {
            for(const rule of Object.keys((block as { rules: Record<string, unknown>; }).rules)) {
                rules.add(rule);
            }
        }
    }
    return rules;
}

import { Linter } from "eslint";

export type CustomTypes = 'react' | 'test' | 'ts';

export type LinterConfig = Partial<Linter.Config>;
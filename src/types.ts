import { Linter } from "eslint";

export type CustomTypes = 'babel' | 'react' | 'test' | 'ts';

export type LinterConfig = Partial<Linter.Config>;
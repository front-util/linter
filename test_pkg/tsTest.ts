import { promises } from 'node:fs';
import { join } from 'node:path';

interface FileInfo {
    name: string;
    size: number;
}

class FileService {

    async readFileInfo(dir: string, filename: string): Promise<FileInfo> {
        const fullPath = join(dir, filename);
        const stats = await promises.stat(fullPath);

        return {
            name: filename,
            size: stats.size,
        };
    }

}

export { type FileInfo, FileService, };

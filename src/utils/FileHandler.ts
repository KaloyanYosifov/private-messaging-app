/**
 * External dependencies.
 */
import RNFetchBlob from 'rn-fetch-blob';

class FileHandler {
    async delete(path: string) {
        path = path.replace(/file:\/\/\//, '');

        const response = await RNFetchBlob.fs.exists(path);

        if (response) {
            await RNFetchBlob.fs.unlink(path);

            return;
        }
    }
}

const fileHandler = new FileHandler();

export default fileHandler;

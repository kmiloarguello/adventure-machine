
export default class Buffer {
    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
    }
    loadingSound(url, index) {
        let request = new XMLHttpRequest();
        request.open("get", url, true);
        request.responseType = "arraybuffer";
        let thisBuffer = this;
        request.onload = function() {
            thisBuffer.context.decodeAudioData(request.response, function(buffer) {
                thisBuffer.buffer[index] = buffer;
                if (index === thisBuffer.urls.length - 1) {
                    thisBuffer.loaded();
                }
            });
        };
        request.send();
    }

    loadAll() {
        this.urls.forEach((url, index) => {
            this.loadingSound(url, index);
        });
    }

    loaded() {
		console.log("loaded");
    }

    getSoundByIndex(index) {
        return this.buffer[index];
    }
}




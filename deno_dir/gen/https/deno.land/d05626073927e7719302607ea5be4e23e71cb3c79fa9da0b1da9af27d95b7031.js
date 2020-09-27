export class BitReadStream {
    constructor(buffer, offset = 0) {
        this.nowBitsLength = 0;
        this.isEnd = false;
        this.buffer = buffer;
        this.bufferIndex = offset;
        this.nowBits = buffer[offset];
        this.nowBitsLength = 8;
    }
    read() {
        if (this.isEnd)
            throw new Error("Lack of data length");
        const bit = this.nowBits & 1;
        if (this.nowBitsLength > 1) {
            this.nowBitsLength--;
            this.nowBits >>= 1;
        }
        else {
            this.bufferIndex++;
            if (this.bufferIndex < this.buffer.length) {
                this.nowBits = this.buffer[this.bufferIndex];
                this.nowBitsLength = 8;
            }
            else {
                this.nowBitsLength = 0;
                this.isEnd = true;
            }
        }
        return bit;
    }
    readRange(length) {
        while (this.nowBitsLength <= length) {
            this.nowBits |= this.buffer[++this.bufferIndex] << this.nowBitsLength;
            this.nowBitsLength += 8;
        }
        const bits = this.nowBits & ((1 << length) - 1);
        this.nowBits >>>= length;
        this.nowBitsLength -= length;
        return bits;
    }
    readRangeCoded(length) {
        let bits = 0;
        for (let i = 0; i < length; i++) {
            bits <<= 1;
            bits |= this.read();
        }
        return bits;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX0JpdFJlYWRTdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfQml0UmVhZFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sYUFBYTtJQU14QixZQUFZLE1BQWtCLEVBQUUsU0FBaUIsQ0FBQztRQUYzQyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN2RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQztTQUNwQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1NBQ0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDTSxTQUFTLENBQUMsTUFBYztRQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3RFLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLE1BQU0sTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNNLGNBQWMsQ0FBQyxNQUFjO1FBQ2xDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsSUFBSSxLQUFLLENBQUMsQ0FBQztZQUNYLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiJ9
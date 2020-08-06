const embedLimits = {
    title: 256,
    description: 2048,
    fieldName: 256,
    fieldValue: 1024,
    footerText: 2048,
    authorName: 256,
    fields: 25,
    total: 6000,
};
export class Embed {
    constructor(enforceLimits = true) {
        this.currentTotal = 0;
        this.enforceLimits = true;
        this.color = 0x41ebf4;
        this.fields = [];
        if (!enforceLimits)
            this.enforceLimits = false;
        return this;
    }
    fitData(data, max) {
        if (data.length > max)
            data = data.substring(0, max);
        const availableCharacters = embedLimits.total - this.currentTotal;
        if (!availableCharacters)
            return ``;
        if (this.currentTotal + data.length > embedLimits.total) {
            return data.substring(0, availableCharacters);
        }
        return data;
    }
    setAuthor(name, icon, url) {
        const finalName = this.enforceLimits
            ? this.fitData(name, embedLimits.authorName)
            : name;
        this.author = { name: finalName, icon_url: icon, url };
        return this;
    }
    setColor(color) {
        this.color = color.toLowerCase() === `random`
            ?
                Math.floor(Math.random() * (0xffffff + 1))
            :
                parseInt(color.replace("#", ""), 16);
        return this;
    }
    setDescription(description) {
        this.description = this.fitData(description, embedLimits.description);
        return this;
    }
    addField(name, value, inline = false) {
        if (this.fields.length >= 25)
            return this;
        this.fields.push({
            name: this.fitData(name, embedLimits.fieldName),
            value: this.fitData(value, embedLimits.fieldValue),
            inline,
        });
        return this;
    }
    addBlankField(inline = false) {
        return this.addField("\u200B", "\u200B", inline);
    }
    attachFile(file, name) {
        this.file = {
            blob: file,
            name,
        };
        this.setImage(`attachment://${name}`);
        return this;
    }
    setFooter(text, icon) {
        this.footer = {
            text: this.fitData(text, embedLimits.footerText),
            icon_url: icon,
        };
        return this;
    }
    setImage(url) {
        this.image = { url };
        return this;
    }
    setTimestamp(time = Date.now()) {
        this.timestamp = new Date(time).toISOString();
        return this;
    }
    setTitle(title, url) {
        this.title = this.fitData(title, embedLimits.title);
        if (url)
            this.url = url;
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFbWJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxNQUFNLFdBQVcsR0FBRztJQUNsQixLQUFLLEVBQUUsR0FBRztJQUNWLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFNBQVMsRUFBRSxHQUFHO0lBQ2QsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEdBQUc7SUFDZixNQUFNLEVBQUUsRUFBRTtJQUNWLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLE1BQU0sT0FBTyxLQUFLO0lBbUJoQixZQUFZLGFBQWEsR0FBRyxJQUFJO1FBakJoQyxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUlyQixVQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2pCLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBWXhCLElBQUksQ0FBQyxhQUFhO1lBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFL0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVksRUFBRSxHQUFXO1FBRS9CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXJELE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRWxFLElBQUksQ0FBQyxtQkFBbUI7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUMvQztRQUVE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
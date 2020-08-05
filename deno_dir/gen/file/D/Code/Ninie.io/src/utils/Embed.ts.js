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
        this.color =
            color.toLowerCase() === `random`
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
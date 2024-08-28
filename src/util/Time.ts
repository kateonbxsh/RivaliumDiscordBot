export default class Time {
    
    static wait(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        })
    }
    
    private static formatName(amount: number, name: string, decorator: string): string | null {
        if (!amount || amount <= 0) return null;
        const plural = amount > 1;
        return `${decorator}${plural ? amount : (name == "hour" ? "an" : "a")}${decorator} ${name}${plural ? "s" : ""}`
    }
    
    static format(ms: number, decorator: string = "") {
        
        if (ms <= 1000) return "Just now";
        
        const amounts = [];
        
        let current = ms;
        for (const divider of [1000, 60, 60, 24, 7, 4, 12, 1]) {
            amounts.push(current % divider); 
            current = Math.floor(current / divider);
        }
        amounts.shift();
        
        const formats = [];
        let i = 0;
        for (const name of ["second", "minute", "hour", "day", "week", "month", "year"]) {
            const format = Time.formatName(amounts[i++], name, decorator);
            if (format) formats.unshift(format);
        }
        
        let finalFormat = formats.join(", ");
        finalFormat = finalFormat.replace(/, (?!.*?, )/, " and ");
        finalFormat = finalFormat.replace(finalFormat.charAt(0), finalFormat.charAt(0).toUpperCase());
        return finalFormat;
        
    }
    
}

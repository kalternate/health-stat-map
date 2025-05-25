export function getFlagEmoji(countryCodeIso2: string) {
    const codePoints = countryCodeIso2
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
  

/**
 * 是否为链接
 * @param url url string
 * @returns 
 */
export const isLink = (url: string): boolean => /^(http[s]):\/\//.test(url);




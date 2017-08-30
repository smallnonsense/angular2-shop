export class UrlUtil {
  public static ensureUrl(url: string) {
    if (!url) {
      console.warn('url isn\'t defined. taking base \'/\'');
    }
    return url || '/';
  }
}

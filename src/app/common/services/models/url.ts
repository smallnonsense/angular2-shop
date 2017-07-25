export class Url {

  public url: string;
  public fragments: string[];
  public params: { [name: string]: string };

  public static get delimiter() { return '/'; }

  public static parse(urlString: string): Url {
    const url = decodeURIComponent(urlString || Url.delimiter);
    const queryParamsStartsAt = url.indexOf('?');
    if (queryParamsStartsAt <= 0) {
      const fragments = url.split(Url.delimiter).map(fragment => fragment || this.delimiter);
      const params = {};
      return { url, fragments, params };
    }

    const query = url.substring(0, queryParamsStartsAt);
    const queryParams = url.substring(queryParamsStartsAt + 1);
    const fragments = query.split(Url.delimiter).map(fragment => fragment || this.delimiter);
    const params = queryParams.split('&')
      .map(pair => pair.split('='))
      .map(pair => ({ [pair[0]]: pair[1] }))
      .reduce((obj, pair) => Object.assign(obj, pair), {});
    return { url, fragments, params };
  }
}

import { UrlTree, UrlSegment, UrlSegmentGroup } from '@angular/router';

export class Url {

  public url: string;
  public segments: string[];
  public params: { [name: string]: string };

  public static parse(urlString: string) { return UrlHelper.parse(urlString); }
  public static parseTree(urlTree: UrlTree) { return UrlHelper.parseTree(urlTree); }
  public static parseSegments(urlSegments: UrlSegment[]) { return UrlHelper.parseSegments(urlSegments); }
}

class UrlHelper {

  public static parseSegments(urlSegments: UrlSegment[]): Url {
    const url = '';
    const segments = urlSegments.map(segment => segment.path);
    const params = urlSegments[0].parameters;
    return { url, segments, params };
  }

  public static parseTree(urlTree: UrlTree): Url {
    const url = urlTree.toString();
    const outlet = urlTree.root.children.primary || new UrlSegmentGroup([], {});
    const segments = outlet.segments.map(segment => segment.path);
    const params = urlTree.queryParams;
    return { url, segments, params };
  }

  public static parse(urlString: string): Url {
    const url = decodeURIComponent(urlString || UrlHelper.delimiter);
    const queryParamsPair = UrlHelper.splitOne(url, '?');
    if (queryParamsPair.length === 1) {
      const segments = url.split(UrlHelper.delimiter).map(segment => segment || this.delimiter);
      const params = {};
      return { url, segments, params };
    }

    const query = queryParamsPair[0];
    const queryParams = queryParamsPair[1];
    const segments = query.split(UrlHelper.delimiter).map(segment => segment || this.delimiter);
    const params = queryParams.split('&')
      .map(pair => UrlHelper.splitOne(pair, '='))
      .map(pair => ({ [pair[0]]: pair[1] || '' }))
      .reduce((obj, pair) => Object.assign(obj, pair), {});
    return { url, segments, params };
  }
  private static get delimiter() { return '/'; }
  private static splitOne(text: string, symbol: string): string[] {
    const symbolStartsAt = text.indexOf(symbol);
    if (symbolStartsAt <= 0) {
      return [text];
    }
    const part1 = text.substring(0, symbolStartsAt);
    const part2 = text.substring(symbolStartsAt + 1);
    return [part1, part2]
  }
}

// To parse this data:
//
//   import { Convert, News } from "./file";
//
//   const news = Convert.toNews(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/* eslint-disable */

export interface News {
  _type: string;
  readLink: string;
  queryContext: QueryContext;
  totalEstimatedMatches: number;
  sort: Sort[];
  value: Value[];
}

export interface QueryContext {
  _type: string;
  originalQuery: string;
  adultIntent: boolean;
}

export interface Sort {
  _type: string;
  name: string;
  id: string;
  isSelected: boolean;
  url: string;
}

export interface Value {
  _type: string;
  name: string;
  url: string;
  image: ValueImage;
  description: string;
  about: About[];
  mentions?: Mention[];
  provider: Provider[];
  datePublished: Date;
  category?: string;
}

export interface About {
  _type: Type;
  readLink: string;
  name: string;
}

export enum Type {
  Thing = 'Thing',
}

export interface ValueImage {
  _type: string;
  thumbnail: PurpleThumbnail;
}

export interface PurpleThumbnail {
  _type: string;
  contentUrl: string;
  width: number;
  height: number;
}

export interface Mention {
  _type: Type;
  name: string;
}

export interface Provider {
  _type: string;
  name: string;
  image?: ProviderImage;
}

export interface ProviderImage {
  _type: string;
  thumbnail: FluffyThumbnail;
}

export interface FluffyThumbnail {
  _type: string;
  contentUrl: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toNews(json: string): News {
    return cast(JSON.parse(json), r('News'));
  }

  public static newsToJson(value: News): string {
    return JSON.stringify(uncast(value, r('News')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ,
      )} but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  News: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'readLink', js: 'readLink', typ: '' },
      { json: 'queryContext', js: 'queryContext', typ: r('QueryContext') },
      { json: 'totalEstimatedMatches', js: 'totalEstimatedMatches', typ: 0 },
      { json: 'sort', js: 'sort', typ: a(r('Sort')) },
      { json: 'value', js: 'value', typ: a(r('Value')) },
    ],
    false,
  ),
  QueryContext: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'originalQuery', js: 'originalQuery', typ: '' },
      { json: 'adultIntent', js: 'adultIntent', typ: true },
    ],
    false,
  ),
  Sort: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'isSelected', js: 'isSelected', typ: true },
      { json: 'url', js: 'url', typ: '' },
    ],
    false,
  ),
  Value: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'url', js: 'url', typ: '' },
      { json: 'image', js: 'image', typ: r('ValueImage') },
      { json: 'description', js: 'description', typ: '' },
      { json: 'about', js: 'about', typ: a(r('About')) },
      { json: 'mentions', js: 'mentions', typ: u(undefined, a(r('Mention'))) },
      { json: 'provider', js: 'provider', typ: a(r('Provider')) },
      { json: 'datePublished', js: 'datePublished', typ: Date },
      { json: 'category', js: 'category', typ: u(undefined, '') },
    ],
    false,
  ),
  About: o(
    [
      { json: '_type', js: '_type', typ: r('Type') },
      { json: 'readLink', js: 'readLink', typ: '' },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  ValueImage: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'thumbnail', js: 'thumbnail', typ: r('PurpleThumbnail') },
    ],
    false,
  ),
  PurpleThumbnail: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'contentUrl', js: 'contentUrl', typ: '' },
      { json: 'width', js: 'width', typ: 0 },
      { json: 'height', js: 'height', typ: 0 },
    ],
    false,
  ),
  Mention: o(
    [
      { json: '_type', js: '_type', typ: r('Type') },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  Provider: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'image', js: 'image', typ: u(undefined, r('ProviderImage')) },
    ],
    false,
  ),
  ProviderImage: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'thumbnail', js: 'thumbnail', typ: r('FluffyThumbnail') },
    ],
    false,
  ),
  FluffyThumbnail: o(
    [
      { json: '_type', js: '_type', typ: '' },
      { json: 'contentUrl', js: 'contentUrl', typ: '' },
    ],
    false,
  ),
  Type: ['Thing'],
};

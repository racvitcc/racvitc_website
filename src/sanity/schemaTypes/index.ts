import type { SchemaTypeDefinition } from "sanity";

import { eventType } from "./event";
import { galleryItemType } from "./galleryItem";
import { projectType } from "./project";

export const schemaTypes: SchemaTypeDefinition[] = [
  eventType,
  projectType,
  galleryItemType,
];

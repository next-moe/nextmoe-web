export interface LegalSection {
  id: string
  title: string
  body?: string[]
  list?: string[]
}

export interface LegalDoc {
  title: string
  summary: string
  sections: LegalSection[]
}

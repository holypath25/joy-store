export interface DLProduct {
  item_id: string
  item_name: string
  item_category: string
  quantity?: number
}

export interface ProductViewEvent {
  event: 'product_view'
  product: DLProduct
  page_path: string
}

export interface CategoryViewEvent {
  event: 'category_view'
  category_name: string
  page_path: string
}

export interface AddToQuoteEvent {
  event: 'add_to_quote'
  product: DLProduct
  quote_list_size: number
}

export interface RemoveFromQuoteEvent {
  event: 'remove_from_quote'
  product: DLProduct
  quote_list_size: number
}

export interface QuoteRequestStartEvent {
  event: 'quote_request_start'
  quote_list_size: number
  page_path: string
}

export interface QuoteRequestSubmitEvent {
  event: 'quote_request_submit'
  quote_list_size: number
  buyer_type: string
  inquiry_type: string
  hashed_email?: string
}

export interface BulkOrderRequestSubmitEvent {
  event: 'bulk_order_request_submit'
  product_interest: string
  quantity_range: string
  hashed_email?: string
}

export interface WhatsAppClickEvent {
  event: 'whatsapp_click'
  click_location: string
}

export interface CatalogDownloadEvent {
  event: 'catalog_download'
  hashed_email?: string
}

export interface ContactEmailClickEvent {
  event: 'contact_email_click'
  click_location: string
}

export interface BlogArticleViewEvent {
  event: 'blog_article_view'
  article_slug: string
  article_title: string
}

export type DataLayerEvent =
  | ProductViewEvent
  | CategoryViewEvent
  | AddToQuoteEvent
  | RemoveFromQuoteEvent
  | QuoteRequestStartEvent
  | QuoteRequestSubmitEvent
  | BulkOrderRequestSubmitEvent
  | WhatsAppClickEvent
  | CatalogDownloadEvent
  | ContactEmailClickEvent
  | BlogArticleViewEvent

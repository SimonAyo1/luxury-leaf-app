import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  DocumentData,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Product model
export interface Product {
  id: number
  title: string
  description: string
  type: string
  brand: string
  collection: string[]
  category: string
  price: number
  sale: boolean
  discount: string
  stock: number
  new: boolean
  tags: string[]
  variants: Variant[]
  images: Image[]
}

export interface Variant {
  variant_id: number
  id: number
  sku: string
  image_id: number
}

export interface Image {
  image_id: number
  id: number
  alt: string
  src: string
  variant_id: number[]
}



// Category model
interface Category {
  id: string;
  category: string;
  total_product: number;
  // Add other category properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private products: Observable<Product[]>;
  private categories: Observable<Category[]>;
  private firestore: Firestore = inject(Firestore);

  private productsCollection: CollectionReference<DocumentData>;
  private categoriesCollection: CollectionReference<DocumentData>;

  constructor() {
    this.productsCollection = collection(this.firestore, 'products');
    this.categoriesCollection = collection(this.firestore, 'categories');

    this.products = collectionData(this.productsCollection).pipe(
      map((products) =>
        products.map((product) => ({ id: product.id, ...product.data() }))
      )
    );

    this.categories = collectionData(this.categoriesCollection, {
      idField: 'id',
    }).pipe(
      map((categories) =>
        categories.map((category) => ({ id: category.id, ...category.data() }))
      )
    );
  }

  // Get all categories
  getAllProducts(): Observable<any> {
    return collectionData(this.productsCollection);
  }

  // Get product by ID
  getProductById(productId: string): Observable<any> {
    return collectionData(this.productsCollection, { idField: productId });
  }


  // Get all categories
  getAllCategories(): Observable<any> {
    return collectionData(this.categoriesCollection);
  }

  // Get category by ID
  getCategoryById(categoryId: string): Observable<Category | undefined> {
    return this.categories.pipe(
      map((categories) =>
        categories.find((category) => category.id === categoryId)
      )
    );
  }


  generateUniqueID(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;

    let uniqueID = '';

    // Add random characters to the uniqueID
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }

    // Add timestamp to ensure uniqueness
    const timestamp = Date.now().toString();
    uniqueID += timestamp;

    return uniqueID;
  }

}

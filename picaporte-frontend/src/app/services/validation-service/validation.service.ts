import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address.model';

export class ValidationObject {
  isValid: boolean = true;
  validationMessage: string = "";
}

export class UserValidationObject {
  isNameValid: ValidationObject = new ValidationObject();
  isSurrnameValid: ValidationObject = new ValidationObject();
  isEmailValid: ValidationObject = new ValidationObject();
  isPhoneNumberValid: ValidationObject = new ValidationObject();
  isValid: boolean = false;
}

export class AddressValidationObject {
  isStreetValid: ValidationObject = new ValidationObject();
  isParishValid: ValidationObject = new ValidationObject();
  isCityValid: ValidationObject = new ValidationObject();
  isIslandValid: ValidationObject = new ValidationObject();
  isValid: boolean = false;
}

export class CustomerValidationObject {
  isNameValid: ValidationObject = new ValidationObject();
  isEmailValid: ValidationObject = new ValidationObject();
  isPhoneNumberValid: ValidationObject = new ValidationObject();
  isCcValid: ValidationObject = new ValidationObject();
  isNifValid: ValidationObject = new ValidationObject();
  isAddressValid: boolean = false;
  isValid: boolean = false;
}

export class NewsValidationObject {
  isFileValid: ValidationObject = new ValidationObject();
  isTitleValid: ValidationObject = new ValidationObject();
  isContentValid: ValidationObject = new ValidationObject();
  isValid: boolean = false;
}

export class DocumentValidationObject {
  isTitleValid: ValidationObject = new ValidationObject();
  isTypeValid: ValidationObject = new ValidationObject();
  isFileValid: ValidationObject = new ValidationObject();
  isValid: boolean = false;
}

export class ImageValidationObject {
  isTitleValid: ValidationObject = new ValidationObject();
  isFileValid: ValidationObject = new ValidationObject();
  isValid: boolean = false;
}

export class PropertyValidationObject {
  isReferenceValid: ValidationObject = new ValidationObject();
  isPriceValid: ValidationObject = new ValidationObject();
  isValid: boolean = false;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateUser(name: string, surrname: string, email: string, phoneNumber: string): UserValidationObject {
    let userValidationObject: UserValidationObject = new UserValidationObject();
    userValidationObject.isNameValid.isValid = name != "" && name != null;
    userValidationObject.isNameValid.validationMessage = (userValidationObject.isNameValid.isValid ? "" : "Campo obrigatório");
    userValidationObject.isSurrnameValid.isValid = surrname != "" && surrname != null;
    userValidationObject.isSurrnameValid.validationMessage = (userValidationObject.isSurrnameValid.isValid ? "" : "Campo obrigatório");
    userValidationObject.isEmailValid.isValid = email != "" && email != null;
    userValidationObject.isEmailValid.validationMessage = (userValidationObject.isEmailValid.isValid ? "" : "Campo obrigatório");
    userValidationObject.isPhoneNumberValid.isValid = phoneNumber != "" && phoneNumber != null;
    userValidationObject.isPhoneNumberValid.validationMessage = (userValidationObject.isPhoneNumberValid.isValid ? "" : "Campo obrigatório");

    userValidationObject.isValid = (
      userValidationObject.isNameValid.isValid &&
      userValidationObject.isSurrnameValid.isValid &&
      userValidationObject.isEmailValid.isValid &&
      userValidationObject.isPhoneNumberValid.isValid
    )

    return userValidationObject;
  }

  validateAddress(street: string, parish: string, city: string, island: string): AddressValidationObject {
    let addressValidationObject: AddressValidationObject = new AddressValidationObject();
    
    addressValidationObject.isStreetValid.isValid = street != "" && street != null;
    addressValidationObject.isStreetValid.validationMessage = (addressValidationObject.isStreetValid.isValid ? "" : "Campo obrigatório");
    
    addressValidationObject.isParishValid.isValid = parish != "" && parish != null;
    addressValidationObject.isParishValid.validationMessage = (addressValidationObject.isParishValid.isValid ? "" : "Campo obrigatório");
    
    addressValidationObject.isCityValid.isValid = city != "" && city != null;
    addressValidationObject.isCityValid.validationMessage = (addressValidationObject.isCityValid.isValid ? "" : "Campo obrigatório");
    
    addressValidationObject.isIslandValid.isValid = island != "" && island != null;
    addressValidationObject.isIslandValid.validationMessage = (addressValidationObject.isIslandValid.isValid ? "" : "Campo obrigatório");
  
    addressValidationObject.isValid = (
      addressValidationObject.isStreetValid.isValid &&
      addressValidationObject.isParishValid.isValid &&
      addressValidationObject.isCityValid.isValid &&
      addressValidationObject.isIslandValid.isValid
    )
  
    return addressValidationObject;
  }

  validateCustomer(name: string, email: string, phoneNumber: string, cc: string, nif: string, address: Address): CustomerValidationObject {
    let customerValidationObject: CustomerValidationObject = new CustomerValidationObject();
    
    customerValidationObject.isNameValid.isValid = name != "" && name != null;
    customerValidationObject.isNameValid.validationMessage = (customerValidationObject.isNameValid.isValid ? "" : "Campo obrigatório");
    
    customerValidationObject.isEmailValid.isValid = email != "" && email != null;
    customerValidationObject.isEmailValid.validationMessage = (customerValidationObject.isEmailValid.isValid ? "" : "Campo obrigatório");
    
    customerValidationObject.isPhoneNumberValid.isValid = phoneNumber != "" && phoneNumber != null;
    customerValidationObject.isPhoneNumberValid.validationMessage = (customerValidationObject.isPhoneNumberValid.isValid ? "" : "Campo obrigatório");
  
    customerValidationObject.isCcValid.isValid = cc != "" && cc != null;
    customerValidationObject.isCcValid.validationMessage = (customerValidationObject.isCcValid.isValid ? "" : "Campo obrigatório");
    
    customerValidationObject.isNifValid.isValid = nif != "" && nif != null;
    customerValidationObject.isNifValid.validationMessage = (customerValidationObject.isNifValid.isValid ? "" : "Campo obrigatório");

    customerValidationObject.isAddressValid = this.validateAddress(address.street, address.parish, address.city, address.island).isValid;
  
    customerValidationObject.isValid = (
      customerValidationObject.isNameValid.isValid &&
      customerValidationObject.isEmailValid.isValid &&
      customerValidationObject.isPhoneNumberValid.isValid &&
      customerValidationObject.isCcValid.isValid &&
      customerValidationObject.isNifValid.isValid &&
      customerValidationObject.isAddressValid
    )
  
    return customerValidationObject;
  }

  validateNews(file: string, title: string, content: string): NewsValidationObject {
    let newsValidationObject: NewsValidationObject = new NewsValidationObject();
    
    newsValidationObject.isFileValid.isValid = file != "" && file != null;
    newsValidationObject.isFileValid.validationMessage = (newsValidationObject.isFileValid.isValid ? "" : "Campo obrigatório");
    
    newsValidationObject.isTitleValid.isValid = title != "" && title != null;
    newsValidationObject.isTitleValid.validationMessage = (newsValidationObject.isTitleValid.isValid ? "" : "Campo obrigatório");
    
    newsValidationObject.isContentValid.isValid = content != "" && content != null;
    newsValidationObject.isContentValid.validationMessage = (newsValidationObject.isContentValid.isValid ? "" : "Campo obrigatório");
  
    newsValidationObject.isValid = (
      newsValidationObject.isFileValid.isValid &&
      newsValidationObject.isTitleValid.isValid &&
      newsValidationObject.isContentValid.isValid
    )
  
    return newsValidationObject;
  }

  validateDocument(title: string, type: string, file: string): DocumentValidationObject {
    let documentValidationObject: DocumentValidationObject = new DocumentValidationObject();
    
    documentValidationObject.isTitleValid.isValid = title != "" && title != null;
    documentValidationObject.isTitleValid.validationMessage = (documentValidationObject.isTitleValid.isValid ? "" : "Campo obrigatório");

    documentValidationObject.isTypeValid.isValid = type != "" && type != null;
    documentValidationObject.isTypeValid.validationMessage = (documentValidationObject.isTypeValid.isValid ? "" : "Campo obrigatório");
        
    documentValidationObject.isFileValid.isValid = file != "" && file != null;
    documentValidationObject.isFileValid.validationMessage = (documentValidationObject.isFileValid.isValid ? "" : "Campo obrigatório");
  
    documentValidationObject.isValid = (
      documentValidationObject.isTitleValid.isValid &&
      documentValidationObject.isTypeValid.isValid &&
      documentValidationObject.isFileValid.isValid
    )
  
    return documentValidationObject;
  }

  validateImage(title: string, file: string): ImageValidationObject {
    let imageValidationObject: ImageValidationObject = new ImageValidationObject();
    
    imageValidationObject.isTitleValid.isValid = title != "" && title != null;
    imageValidationObject.isTitleValid.validationMessage = (imageValidationObject.isTitleValid.isValid ? "" : "Campo obrigatório");
        
    imageValidationObject.isFileValid.isValid = file != "" && file != null;
    imageValidationObject.isFileValid.validationMessage = (imageValidationObject.isFileValid.isValid ? "" : "Campo obrigatório");
  
    imageValidationObject.isValid = (
      imageValidationObject.isTitleValid.isValid &&
      imageValidationObject.isFileValid.isValid
    )
  
    return imageValidationObject;
  }

  validateProperty(reference: string, price: number): PropertyValidationObject {
    let propertyValidationObject: PropertyValidationObject = new PropertyValidationObject();
    
    propertyValidationObject.isReferenceValid.isValid = reference != "" && reference != null;
    propertyValidationObject.isReferenceValid.validationMessage = (propertyValidationObject.isReferenceValid.isValid ? "" : "Campo obrigatório");
    
    propertyValidationObject.isPriceValid.isValid = price != null && !isNaN(price) && price > 0;
    propertyValidationObject.isPriceValid.validationMessage = (propertyValidationObject.isPriceValid.isValid ? "" : "Campo obrigatório e deve ser maior que 0");
    
    propertyValidationObject.isValid = (
      propertyValidationObject.isReferenceValid.isValid &&
      propertyValidationObject.isPriceValid.isValid
    );
  
    return propertyValidationObject;
  }
}

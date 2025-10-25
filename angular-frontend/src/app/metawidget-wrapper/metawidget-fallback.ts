/**
 * Enhanced Metawidget Fallback Implementation
 * Supports nested objects, collections, and complex form structures
 * Demonstrates Metawidget capabilities for dynamic form generation
 */
export class MetawidgetFallback {
  private container: HTMLElement;
  private config: any;
  private _toInspect: any;

  constructor(container: HTMLElement, config: any = {}) {
    this.container = container;
    this.config = config;
  }

  set toInspect(value: any) {
    this._toInspect = value;
    this.render();
  }

  buildWidgets() {
    this.render();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  private render() {
    if (!this._toInspect) {
      this.container.innerHTML = '<div style="padding: 20px; color: #666;">No data to display</div>';
      return;
    }

    const form = this.createForm();
    this.container.innerHTML = '';
    this.container.appendChild(form);
  }

  private createForm(): HTMLElement {
    const form = document.createElement('form');
    form.className = 'metawidget-fallback-form';
    form.id = 'personForm';

    const inspector = this.config.inspector ? this.config.inspector(this._toInspect) : this.getDefaultInspector();
    const properties = inspector.properties || {};

    // Create sections for better organization
    const basicInfoSection = this.createSection('Basic Information');
    const addressSection = this.createSection('Address Information');
    const childrenSection = this.createSection('Children');

    Object.keys(properties).forEach(propertyName => {
      const property = properties[propertyName];
      const fieldContainer = this.createField(propertyName, property);
      
      // Organize fields into sections
      if (propertyName.includes('address') || propertyName === 'street' || propertyName === 'city' || 
          propertyName === 'state' || propertyName === 'zipCode' || propertyName === 'country') {
        addressSection.appendChild(fieldContainer);
      } else if (propertyName === 'children') {
        childrenSection.appendChild(fieldContainer);
      } else {
        basicInfoSection.appendChild(fieldContainer);
      }
    });

    form.appendChild(basicInfoSection);
    form.appendChild(addressSection);
    form.appendChild(childrenSection);

    return form;
  }

  private createSection(title: string): HTMLElement {
    const section = document.createElement('div');
    section.className = 'form-section';
    
    const header = document.createElement('h3');
    header.textContent = title;
    header.className = 'section-header';
    section.appendChild(header);
    
    return section;
  }

  private createField(propertyName: string, property: any): HTMLElement {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'metawidget-field';

    const label = document.createElement('label');
    label.textContent = property.title || propertyName;
    if (property.required) {
      label.innerHTML += ' <span class="required">*</span>';
    }
    fieldContainer.appendChild(label);

    const input = this.createInput(propertyName, property);
    fieldContainer.appendChild(input);

    if (property.description) {
      const help = document.createElement('div');
      help.className = 'help-text';
      help.textContent = property.description;
      fieldContainer.appendChild(help);
    }

    return fieldContainer;
  }

  private createInput(propertyName: string, property: any): HTMLElement {
    const value = this._toInspect[propertyName];

    // Handle nested address object
    if (propertyName === 'address' && typeof value === 'object' && value !== null) {
      return this.createAddressFields(value);
    }

    // Handle children array
    if (propertyName === 'children' && Array.isArray(value)) {
      return this.createChildrenFields(value);
    }

    if (property.type === 'boolean') {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = propertyName;
      checkbox.checked = !!value;
      checkbox.addEventListener('change', (e) => {
        this._toInspect[propertyName] = (e.target as HTMLInputElement).checked;
      });
      return checkbox;
    } else if (property.type === 'number') {
      const input = document.createElement('input');
      input.type = 'number';
      input.name = propertyName;
      input.value = value || '';
      if (property.minimum !== undefined) input.min = property.minimum.toString();
      if (property.maximum !== undefined) input.max = property.maximum.toString();
      input.addEventListener('input', (e) => {
        this._toInspect[propertyName] = parseInt((e.target as HTMLInputElement).value) || 0;
      });
      return input;
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = propertyName;
      input.value = value || '';
      input.required = !!property.required;
      input.addEventListener('input', (e) => {
        this._toInspect[propertyName] = (e.target as HTMLInputElement).value;
      });
      return input;
    }
  }

  private createAddressFields(address: any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'nested-object';

    const fields = [
      { name: 'street', label: 'Street', value: address.street || '' },
      { name: 'city', label: 'City', value: address.city || '' },
      { name: 'state', label: 'State', value: address.state || '' },
      { name: 'zipCode', label: 'ZIP Code', value: address.zipCode || '' },
      { name: 'country', label: 'Country', value: address.country || '' }
    ];

    fields.forEach(field => {
      const fieldContainer = document.createElement('div');
      fieldContainer.className = 'nested-field';

      const label = document.createElement('label');
      label.textContent = field.label;
      fieldContainer.appendChild(label);

      const input = document.createElement('input');
      input.type = 'text';
      input.name = `address.${field.name}`;
      input.value = field.value;
      input.addEventListener('input', (e) => {
        if (!address) address = {};
        address[field.name] = (e.target as HTMLInputElement).value;
        this._toInspect.address = address;
      });
      fieldContainer.appendChild(input);

      container.appendChild(fieldContainer);
    });

    return container;
  }

  private createChildrenFields(children: string[]): HTMLElement {
    const container = document.createElement('div');
    container.className = 'children-container';

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = 'Add Child';
    addButton.className = 'add-child-btn';
    addButton.addEventListener('click', () => {
      this.addChildField(container, children);
    });
    container.appendChild(addButton);

    // Create existing children fields
    children.forEach((child, index) => {
      this.createChildField(container, children, index, child);
    });

    return container;
  }

  private createChildField(container: HTMLElement, children: string[], index: number, value: string = ''): void {
    const childContainer = document.createElement('div');
    childContainer.className = 'child-field';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Child name';
    input.value = value;
    input.addEventListener('input', (e) => {
      children[index] = (e.target as HTMLInputElement).value;
      this._toInspect.children = children;
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-child-btn';
    removeButton.addEventListener('click', () => {
      children.splice(index, 1);
      container.removeChild(childContainer);
      this._toInspect.children = children;
    });

    childContainer.appendChild(input);
    childContainer.appendChild(removeButton);
    container.appendChild(childContainer);
  }

  private addChildField(container: HTMLElement, children: string[]): void {
    const index = children.length;
    children.push('');
    this.createChildField(container, children, index);
  }

  private getDefaultInspector() {
    return {
      properties: Object.keys(this._toInspect).reduce((props, key) => {
        const value = this._toInspect[key];
        props[key] = {
          type: typeof value === 'boolean' ? 'boolean' : 
                 typeof value === 'number' ? 'number' : 
                 Array.isArray(value) ? 'array' : 'string',
          title: key.charAt(0).toUpperCase() + key.slice(1),
          required: false
        };
        return props;
      }, {} as any)
    };
  }
}


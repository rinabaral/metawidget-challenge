# Metawidget Integration with Angular 17

This project demonstrates how to integrate Metawidget with Angular 17 using a custom wrapper component.

## Features

- ✅ **Metawidget Wrapper Component**: A reusable Angular component that wraps Metawidget functionality
- ✅ **Fallback Implementation**: Custom form generator when Metawidget library is not available
- ✅ **TypeScript Support**: Full TypeScript support with proper typing
- ✅ **Angular 17 Compatible**: Uses standalone components and modern Angular features
- ✅ **Responsive Design**: Clean, modern styling for forms
- ✅ **Error Handling**: Comprehensive error handling and user feedback

## Components

### MetawidgetWrapperComponent

Located in `src/app/metawidget-wrapper/`, this component provides:

- **Input Properties**:
  - `toInspect`: The data object to generate a form for
  - `config`: Metawidget configuration object

- **Features**:
  - Automatic retry mechanism for loading Metawidget
  - Fallback to custom form generator if Metawidget fails
  - Proper cleanup on component destruction
  - Change detection integration

### MetawidgetFallback

A custom implementation that provides basic form generation when the Metawidget library is not available.

## Usage Example

```typescript
// In your component
export class MyComponent {
  person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    retired: false
  };

  mwConfig = {
    inspector: (toInspect: any) => ({
      properties: {
        firstName: { 
          type: 'string', 
          required: true, 
          title: 'First Name',
          description: 'Enter your first name'
        },
        lastName: { 
          type: 'string', 
          required: true, 
          title: 'Last Name',
          description: 'Enter your last name'
        },
        age: { 
          type: 'number', 
          title: 'Age', 
          minimum: 0,
          maximum: 120,
          description: 'Enter your age'
        },
        retired: { 
          type: 'boolean', 
          title: 'Retired?',
          description: 'Are you retired?'
        }
      }
    }),
    layout: {
      name: 'table',
      numberOfColumns: 2
    }
  };
}
```

```html
<!-- In your template -->
<app-metawidget-wrapper 
  [toInspect]="person" 
  [config]="mwConfig">
</app-metawidget-wrapper>
```

## Setup

1. **Install Dependencies**: The project already includes the `metawidget` npm package
2. **CDN Scripts**: Metawidget is loaded from CDN in `index.html`
3. **Import Component**: Import `MetawidgetWrapperComponent` in your component

## Configuration Options

### Inspector Function

The `inspector` function defines how properties are rendered:

```typescript
inspector: (toInspect: any) => ({
  properties: {
    propertyName: {
      type: 'string' | 'number' | 'boolean',
      required: boolean,
      title: string,
      description: string,
      minimum?: number,
      maximum?: number
    }
  }
})
```

### Layout Configuration

```typescript
layout: {
  name: 'table',
  numberOfColumns: 2
}
```

## Styling

The component includes comprehensive CSS for:
- Form layout and spacing
- Input field styling
- Error states
- Responsive design
- Fallback form styling

## Troubleshooting

1. **Metawidget not loading**: Check browser console for CDN loading errors
2. **Forms not rendering**: The fallback implementation will automatically activate
3. **Styling issues**: Ensure the CSS files are properly imported

## Browser Support

- Modern browsers with ES6 support
- Angular 17+ required
- TypeScript 5.8+ recommended


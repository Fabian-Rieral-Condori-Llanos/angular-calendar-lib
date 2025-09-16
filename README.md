# Angular Calendar Library

[![Angular](https://img.shields.io/badge/Angular-20-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm version](https://badge.fury.io/js/%40fabian-rieral%2Fangular-calendar-lib.svg)](https://www.npmjs.com/package/@fabian-rieral/angular-calendar-lib)

Una librería moderna de Angular 20 para formatear fechas y mostrar calendarios en múltiples sistemas de calendario usando componentes standalone.

## 🌍 Características

- ✅ **Angular 20** con componentes standalone
- ✅ **Múltiples sistemas de calendario**: Gregoriano, Islámico, Persa, Hebreo, Chino
- ✅ **Formatos flexibles**: Corto, Medio, Largo, Completo y personalizado
- ✅ **Componente de calendario visual** interactivo
- ✅ **Pipe para templates** fácil de usar
- ✅ **Servicio inyectable** para lógica compleja
- ✅ **Soporte de internacionalización** nativa del navegador
- ✅ **TypeScript** completamente tipado
- ✅ **Tree-shakeable** para optimización de bundle

## 🚀 Demo en Vivo

<!-- [Ver Demo](https://github.com/Fabian-Rieral-Condori-Llanos/angular-calendar-lib#demo) -->

## 📦 Instalación

```bash
npm install @fabian-rieral/angular-calendar-lib
```

## 🛠️ Desarrollo

Este es un workspace de Angular que contiene:

- **`projects/ng-calendar-formatter/`** - La librería principal
- **`projects/example-app/`** - Aplicación de ejemplo/demo

### Requisitos

- Node.js 18+
- Angular CLI 20+
- npm o yarn

### Setup del proyecto

```bash
# Clonar el repositorio
git clone https://github.com/Fabian-Rieral-Condori-Llanos/angular-calendar-lib.git
cd angular-calendar-lib

# Instalar dependencias
npm install

# Construir la librería
npm run build:lib

# Ejecutar la aplicación de ejemplo
npm run serve:example
```

### Scripts disponibles

```bash
# Desarrollo
npm run build:lib              # Construir librería
npm run build:lib:watch        # Construir librería en modo watch
npm run serve:example          # Servir aplicación de ejemplo
npm run test:lib              # Ejecutar tests de la librería

# Producción
npm run build:all             # Construir todo
npm run pack:lib              # Empaquetar librería
npm run publish:lib           # Publicar a npm

# Versionado
npm run version:patch         # Actualizar versión patch y publicar
npm run version:minor         # Actualizar versión minor y publicar
npm run version:major         # Actualizar versión major y publicar
```

## 📚 Uso Básico

### Importar componentes standalone

```typescript
import { Component } from '@angular/core';
import { CalendarDisplayComponent, CalendarFormatPipe } from '@fabian-rieral/angular-calendar-lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CalendarDisplayComponent, CalendarFormatPipe],
  template: `
    <!-- Usar el pipe -->
    <p>{{ fecha | calendarFormat:'islamic':'long' }}</p>
    
    <!-- Usar el componente -->
    <lib-calendar-display 
      [calendarType]="'persian'"
      (dateSelected)="onDateSelected($event)">
    </lib-calendar-display>
  `
})
export class ExampleComponent {
  fecha = new Date();
  
  onDateSelected(date: Date) {
    console.log('Fecha seleccionada:', date);
  }
}
```

### Usando módulo tradicional

```typescript
import { NgModule } from '@angular/core';
import { NgCalendarFormatterModule } from '@fabian-rieral/angular-calendar-lib';

@NgModule({
  imports: [NgCalendarFormatterModule],
  // ...
})
export class AppModule { }
```

## 🌐 Calendarios Soportados

| Calendario | Código | Descripción |
|-----------|--------|-------------|
| Gregoriano | `gregorian` | Calendario occidental estándar |
| Islámico | `islamic` | Calendario Hijri/lunar islámico |
| Persa | `persian` | Calendario solar persa (Jalaali) |
| Hebreo | `hebrew` | Calendario hebreo tradicional |
| Chino | `chinese` | Calendario lunisolar chino |

## 📖 Documentación Completa

Para documentación detallada, ejemplos de uso y API completa, consulta:

- [Documentación de la Librería](./projects/ng-calendar-formatter/README.md)
- [Código de la Aplicación de Ejemplo](./projects/example-app/src/app/app.component.ts)

## 🏗️ Estructura del Proyecto

```
angular-calendar-lib/
├── projects/
│   ├── ng-calendar-formatter/     # 📚 Librería principal
│   │   ├── src/lib/
│   │   │   ├── types/            # Tipos TypeScript
│   │   │   ├── services/         # Servicios
│   │   │   ├── pipes/            # Pipes
│   │   │   ├── components/       # Componentes
│   │   │   └── ng-calendar-formatter.module.ts
│   │   ├── README.md
│   │   └── package.json
│   └── example-app/              # 🎯 Aplicación de ejemplo
├── dist/                         # 📦 Archivos construidos
├── README.md
├── package.json
└── angular.json
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test:lib

# Tests con coverage
npm run test:lib:coverage

# Tests en modo watch
npm run test:lib:watch
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📋 Requisitos del Sistema

- Angular 20+
- TypeScript 5.9+
- Node.js 18+
- Navegadores modernos con soporte para Intl.DateTimeFormat

## 🔗 Enlaces

- [npm Package](https://www.npmjs.com/package/@fabian-rieral/angular-calendar-lib)
- [Repositorio GitHub](https://github.com/Fabian-Rieral-Condori-Llanos/angular-calendar-lib)
- [Issues](https://github.com/Fabian-Rieral-Condori-Llanos/angular-calendar-lib/issues)
- [Releases](https://github.com/Fabian-Rieral-Condori-Llanos/angular-calendar-lib/releases)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## ✨ Autor

**Fabian Rieral Condori Llanos**

- GitHub: [@Fabian-Rieral-Condori-Llanos](https://github.com/Fabian-Rieral-Condori-Llanos)
- Email: condorillanosfabianrieral@gmail.com

## 🙏 Agradecimientos

- Angular Team por el increíble framework
- Moment.js por las librerías de calendario
- Comunidad open source

---

⭐ Si este proyecto te resultó útil, ¡no olvides darle una estrella en GitHub!
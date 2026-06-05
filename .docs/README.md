# Refactorización con Clean Architecture

## Problemas identificados

El código original presentaba las siguientes falencias arquitectónicas:

### 1. Acoplamiento directo a la base de datos
Los servicios (`PostsService`, `CategoriesService`, `CommentsService`, etc.) dependían directamente de `PrismaService`, mezclando lógica de negocio con acceso a datos. Esto viola el **Principio de Inversión de Dependencias**.

```typescript
// ANTES — el servicio dependía directamente de Prisma
@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.category.findMany({ orderBy: { name: "asc" } })
  }
}
```

### 2. Ausencia de capas definidas
No existía separación entre dominio, aplicación e infraestructura. Toda la lógica vivía en una única capa de servicios, haciendo el código difícil de testear y mantener.

### 3. Sin entidades de dominio
El proyecto no tenía entidades propias. Los datos se retornaban directamente como objetos de Prisma, acoplando el dominio al ORM.

### 4. Sin casos de uso explícitos
Las operaciones de negocio no estaban encapsuladas. La lógica estaba dispersa en los servicios sin una separación clara de responsabilidades.

---

## Solución aplicada — Clean Architecture

Se aplicó **Clean Architecture** en todos los módulos del servidor, organizando el código en tres capas:

```
módulo/
├── application/
│   └── use-cases/        ← casos de uso (lógica de negocio)
├── domain/
│   ├── entities/         ← entidades puras del dominio
│   └── repositories/     ← interfaces (contratos)
└── infrastructure/
    └── repositories/     ← implementaciones con Prisma
```

### Módulos refactorizados
- `likes`
- `categories`
- `moderation`
- `comments`
- `posts`

---

## Diagrama de capas

```
┌─────────────────────────────────────────────┐
│              PRESENTACIÓN                   │
│         Controller / DTOs                   │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│              APLICACIÓN                     │
│             Use Cases                       │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│                DOMINIO                      │
│       Entities + Repository Interfaces      │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│            INFRAESTRUCTURA                  │
│        PrismaRepository (implementación)    │
└─────────────────────────────────────────────┘
```

### Regla principal
Las capas internas **nunca** dependen de las externas. El dominio no conoce Prisma. Los casos de uso no conocen NestJS.

---

## Ejemplo de refactorización — módulo `categories`

### Antes
```typescript
@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({ orderBy: { name: "asc" } })
  }
}
```

### Después

**Entidad de dominio:**
```typescript
export class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
```

**Interfaz de repositorio:**
```typescript
export interface CategoriesRepository {
  findAll(): Promise<Category[]>;
}
```

**Caso de uso:**
```typescript
export class GetCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }
}
```

**Implementación con Prisma:**
```typescript
@Injectable()
export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const results = await this.prisma.category.findMany({ orderBy: { name: "asc" } });
    return results.map((c) => new Category(c.id, c.name));
  }
}
```

---

## Beneficios obtenidos

- **Testeabilidad:** los casos de uso pueden testearse con mocks sin necesidad de base de datos.
- **Mantenibilidad:** cambiar el ORM solo requiere modificar la capa de infraestructura.
- **Separación de responsabilidades:** cada capa tiene una única razón para cambiar.
- **Independencia del framework:** el dominio no depende de NestJS ni Prisma.

---

## Participación del equipo

| Integrante | Rol | Responsabilidad |
|-----------|-----|----------------|
| Yadhira Zambrano Sáez | Líder | Fork del repositorio + Módulos `likes` y `categories` |
| Rallen Castro Antiqueo | Integrante | Módulos `moderation` y `comments` |
| Matías Zapata Orellana | Integrante | Módulo `posts` y documentación (`README.md`) |
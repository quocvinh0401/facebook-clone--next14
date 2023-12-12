export abstract class Mapper<D, E> {
  abstract toDTO(entity: E): D;
  abstract toEntity(dto: D): E;
}

const TYPE_REQUIRED = "O campo 'type' é obrigatório";

const TYPE_INVALID = "O campo 'type' deve ser somente 'Carro' ou 'Moto'";

const MODEL_REQUIRED = "O campo 'model' é obrigatório";

const PLATE_REQUIRED = "O campo 'plate' é obrigatório";

const PLATE_FORMAT_INVALID =  "A 'plate' deve ter o formato 'XYZ123'";  

const VALUE_REQUIRED = "O campo 'daily_value' é obrigatório";

const MIN_VALUE_REQUIRED =  "O campo 'daily_value' deve ser um valor positivo maior que 1";      

const NAME_REQUIRED = "O campo 'name' é obrigatório";

const MIN_NAME_LENGTH =  "O 'name' deve ter pelo menos 3 caracteres";

const CPF_REQUIRED = "O campo 'cpf' é obrigatório";

const CPF_FORMAT_INVALID =  "O campo 'cpf' deve ter o formato '12345678901'";  

const LICENSE_TYPE_REQUIRED = "O campo 'type' é obrigatório";

const LICENSE_TYPE_INVALID = "O campo 'license_type' deve ser somente 'A' ou 'B'";

const CAR_TYPES = ['Carro', 'Moto'];

const LICENSE_TYPES = ['A', 'B'];

export {
  TYPE_REQUIRED,
  TYPE_INVALID,
  MODEL_REQUIRED,
  PLATE_REQUIRED,
  PLATE_FORMAT_INVALID,
  VALUE_REQUIRED,
  MIN_VALUE_REQUIRED,
  NAME_REQUIRED,
  MIN_NAME_LENGTH,
  CPF_REQUIRED,
  CPF_FORMAT_INVALID,
  LICENSE_TYPE_REQUIRED,
  LICENSE_TYPE_INVALID,
  CAR_TYPES,
  LICENSE_TYPES,
};
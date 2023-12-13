CREATE TABLE organismo (
    id_organismo SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    direccion VARCHAR(255),
    poblacion VARCHAR(255),
    codigo_postal VARCHAR(10),
    telefono VARCHAR(20)
);

CREATE TABLE Convocatoria (
    id_convocatoria INT PRIMARY KEY,
    fecha_publicacion DATE,
    programa VARCHAR(255),
    fecha_limite_solicitudes DATE,
    numero_convocatoria INT UNIQUE,
    web VARCHAR(255),
    boe_dogb int,
    fecha_resolucion DATE,
    id_organismo_convocatoria INT,
    FOREIGN KEY (id_organismo_convocatoria) REFERENCES organismo(id_organismo)
);

CREATE TABLE investigador (
    id_investigador INT PRIMARY KEY,
    nombre VARCHAR(255),
    area_conocimiento VARCHAR(255),
    id_departamento_investigador INT,
    FOREIGN KEY (id_departamento_investigador) REFERENCES departamento(id_departamento)
);

CREATE TABLE grupo_investigacion (
    id_grupo INT PRIMARY KEY,
    nombre_grupo VARCHAR(255),
    id_investigador INT,
    departamento_grupo VARCHAR(255),
    FOREIGN KEY (id_investigador) REFERENCES investigador(id_investigador)
);


CREATE TABLE departamento (
    id_departamento INT PRIMARY KEY,
    nombre VARCHAR(255),
    director VARCHAR(255)
);

CREATE TABLE Solicitud (
    id_solicitud INT PRIMARY KEY,
    id_convocatoria_solicitud INT,
    id_investigador_solicitud INT,
    id_grupo_solicitud INT,
    fecha_presentacion DATE,
    TituloProyecto VARCHAR(255),
    FechaResolucion DATE,
    EstadoAprobacion BOOLEAN,
    importe_solicitado DECIMAL(10, 2),
    inicio_proyecto DATE,
    fin_proyecto DATE,
    duracion_,eses INT,
    numero_entrada_registro INT,
    FOREIGN KEY (id_convocatoria_solicitud) REFERENCES Convocatoria(id_convocatoria),
    FOREIGN KEY (id_investigador_solicitud) REFERENCES Investigador(id_investigador),
    FOREIGN KEY (id_grupo_solicitud) REFERENCES grupo_investigacion(id_grupo)
);

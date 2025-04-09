-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 22:23:48
-- Versión del servidor: 9.2.0
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appdatabase`
--
CREATE DATABASE IF NOT EXISTS `appdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `appdatabase`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin_config`
--

CREATE TABLE `admin_config` (
  `id` int NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int NOT NULL,
  `token` varchar(500) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `num_mesa` int NOT NULL,
  `activo` tinyint NOT NULL,
  `fecha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id` int NOT NULL,
  `total` int NOT NULL,
  `dineroRecibido` int NOT NULL,
  `cambio` int NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `pedido_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `estado` varchar(500) NOT NULL,
  `activado` tinyint NOT NULL DEFAULT '1',
  `client_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_plato`
--

CREATE TABLE `pedido_plato` (
  `id` int NOT NULL,
  `anotacion` varchar(255) NOT NULL,
  `cantidad` bigint NOT NULL,
  `subtotal` int NOT NULL,
  `pedido_id` int DEFAULT NULL,
  `plato_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plato`
--

CREATE TABLE `plato` (
  `id` int NOT NULL,
  `imagen` varchar(500) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` bigint NOT NULL,
  `activo` tinyint NOT NULL,
  `categoriaId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin_config`
--
ALTER TABLE `admin_config`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_20d9f4ba16b85617b632f29917` (`pedido_id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3e9c86c0d18996b1d499a0ad033` (`client_id`);

--
-- Indices de la tabla `pedido_plato`
--
ALTER TABLE `pedido_plato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4c67e593f0eb6cce6002404248c` (`pedido_id`),
  ADD KEY `FK_5d57e4f2ef24c5fa745eae5fd44` (`plato_id`);

--
-- Indices de la tabla `plato`
--
ALTER TABLE `plato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8215ca7dc14d7f5357ee487a75d` (`categoriaId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin_config`
--
ALTER TABLE `admin_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido_plato`
--
ALTER TABLE `pedido_plato`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plato`
--
ALTER TABLE `plato`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `FK_20d9f4ba16b85617b632f29917d` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `FK_3e9c86c0d18996b1d499a0ad033` FOREIGN KEY (`client_id`) REFERENCES `cliente` (`id`);

--
-- Filtros para la tabla `pedido_plato`
--
ALTER TABLE `pedido_plato`
  ADD CONSTRAINT `FK_4c67e593f0eb6cce6002404248c` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_5d57e4f2ef24c5fa745eae5fd44` FOREIGN KEY (`plato_id`) REFERENCES `plato` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `plato`
--
ALTER TABLE `plato`
  ADD CONSTRAINT `FK_8215ca7dc14d7f5357ee487a75d` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

import EErros from "../services/errors/enums.js";

export default (error, req, res, next) => {
    console.error(error);

    switch (error.code) {
        case EErros.ROUTING_ERROR:
            res.status(404).json({ status: 'error', error: error.message });
            break;
        case EErros.INVALID_TYPES_ERROR:
            res.status(400).json({ status: 'error', error: error.message });
            break;
        case EErros.DATABASE_ERROR:
            res.status(500).json({ status: 'error', error: error.message });
            break;
        default:
            res.status(500).json({ status: 'error', error: 'Error no manejado' });
            break;
    }
}

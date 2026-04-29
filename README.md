# Digital Nomad Summit (DNS)

Este proyecto es la plataforma oficial del Digital Nomad Summit.

## Notas Técnicas Importantes

> [!NOTE]
> **Backend Temporal**: Este proyecto está utilizando actualmente el proyecto Supabase `cliente-nuevo-facturacion` como backend temporal para las secciones de **Partners** e **Influencers**.
> 
> La lógica de DNS está estrictamente separada de cualquier otra tabla existente en dicho proyecto (facturación, etc.). Las únicas tablas creadas para DNS son:
> - `partners`
> - `influencers`
> 
> Los **Speakers** continúan gestionándose a través de **Airtable**.

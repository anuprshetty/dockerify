# named templates (sometimes called partial templates or sub templates)
# Refer --> https://helm.sh/docs/chart_template_guide/named_templates/

{{- define "fibonacci.app.env" }}
namespace: {{ $.Values.app.name }}-{{ $.Values.app.env }}
{{- end }}

from rest_framework import status
from rest_framework.response import Response


class InOutSerializer:
    output_serializer_class = None

    def get_output_serializer_class(self):
        return self.output_serializer_class or self.get_serializer_class()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data,
                                         partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        output_serializer_class = self.get_output_serializer_class()
        if output_serializer_class != serializer.__class__:
            serializer = output_serializer_class(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        output_serializer_class = self.get_output_serializer_class()
        if output_serializer_class != serializer.__class__:
            serializer = output_serializer_class(serializer.instance)

        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)

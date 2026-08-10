import {
    Button,
    Modal,
    useOverlayState,
} from "@heroui/react";

import { useDeleteArticle } from "../../hooks/useDeleteArticle";

interface DeleteArticleDialogProps {
    articleId: string;
    articleTitle: string;
}

export function DeleteArticleDialog({
    articleId,
    articleTitle,
}: DeleteArticleDialogProps) {

    const state = useOverlayState();

    const deleteMutation =
        useDeleteArticle();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(
                articleId
            );

            state.close();
        } catch {
            // El error ya queda disponible
            // en deleteMutation.isError
        }
    };

    return (
        <Modal state={state}>

            {/* Botón que abre el modal */}
            <Button
                variant="danger"
                size="sm"
                onPress={state.open}
            >
                Eliminar
            </Button>

            <Modal.Backdrop>
                <Modal.Container
                    size="sm"
                >
                    <Modal.Dialog>

                        {({ close }) => (
                            <>
                                <Modal.Header>
                                    <Modal.Heading>
                                        Eliminar artículo
                                    </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body>
                                    <div className="space-y-3">

                                        <p className="text-sm text-default-600">
                                            ¿Estás seguro de que
                                            querés eliminar el
                                            artículo{" "}
                                            <strong className="text-foreground">
                                                "{articleTitle}"
                                            </strong>
                                            ?
                                        </p>

                                        <div className="rounded-lg border border-danger/20 bg-danger/5 p-3">
                                            <p className="text-sm text-danger">
                                                Esta acción no se
                                                puede deshacer.
                                            </p>
                                        </div>

                                        {deleteMutation.isError && (
                                            <div className="rounded-lg border border-danger/20 bg-danger/5 p-3">
                                                <p className="text-sm text-danger">
                                                    {
                                                        deleteMutation
                                                            .error
                                                            .message
                                                    }
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </Modal.Body>

                                <Modal.Footer>

                                    <Button
                                        variant="secondary"
                                        onPress={close}
                                        isDisabled={
                                            deleteMutation.isPending
                                        }
                                    >
                                        Cancelar
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onPress={handleDelete}
                                        isDisabled={
                                            deleteMutation.isPending
                                        }
                                    >
                                        {deleteMutation.isPending
                                            ? "Eliminando..."
                                            : "Eliminar artículo"}
                                    </Button>

                                </Modal.Footer>
                            </>
                        )}

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>

        </Modal>
    );
}
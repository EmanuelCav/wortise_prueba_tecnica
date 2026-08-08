import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";

import { useState } from "react";

import { useDeleteArticle } from "../../hooks/useDeleteArticle";

interface DeleteArticleDialogProps {
    articleId: string;
    articleTitle: string;
}

export function DeleteArticleDialog({
    articleId,
    articleTitle,
}: DeleteArticleDialogProps) {

    const [isOpen, setIsOpen] = useState(false);

    const deleteMutation = useDeleteArticle();

    const handleDelete = async () => {
        await deleteMutation.mutateAsync(articleId);
        setIsOpen(false);
    }

    return (
        <>
            <Button
                variant="danger"
                onPress={() => setIsOpen(true)}
            >
                Eliminar
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            >
                <ModalHeader>
                    Eliminar artículo
                </ModalHeader>

                <ModalBody>
                    <p>
                        ¿Estás seguro de que querés
                        eliminar el artículo{" "}
                        <strong>
                            "{articleTitle}"
                        </strong>
                        ?
                    </p>

                    <p className="text-sm text-danger">
                        Esta acción no se puede deshacer.
                    </p>

                    {deleteMutation.isError && (
                        <p className="text-sm text-danger">
                            {deleteMutation.error.message}
                        </p>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="primary"
                        onPress={() => setIsOpen(false)}
                        isDisabled={deleteMutation.isPending}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="danger"
                        onPress={handleDelete}
                        isDisabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending
                            ? "Eliminando..."
                            : "Eliminar artículo"}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
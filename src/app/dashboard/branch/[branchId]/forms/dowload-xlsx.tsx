"use client";

import { downloadFormUserDataApi } from "@/api/form-user-data";
import { ButtonAsync } from "@/components";
import { isNullish } from "@/utils/check";
import { downloadBlob } from "@/utils/download-file";
import toast from "react-hot-toast";

interface DownloadXLSXProps {
  branch: Branch | null;
}

export default function DownloadXLSX(props: DownloadXLSXProps) {
  const { branch } = props;
  const downloadXlsx = async () => {
    if (isNullish(branch)) {
      return toast.error("Error al descargar el archivo");
    }

    const res = await downloadFormUserDataApi({ branchId: branch.id });

    if (!res.success || res.data === null) {
      return toast.error("Error al descargar el archivo");
    }

    downloadBlob({
      blob: res.data,
      filename: `${branch?.name}-Asistentes.xlsx`,
    });
  };

  return <ButtonAsync onClick={downloadXlsx}>Descargar</ButtonAsync>;
}

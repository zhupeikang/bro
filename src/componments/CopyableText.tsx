'use client'

import React, { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { Copy, CopyCheck } from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/react";

type CopyableTextProps = {
    text: string | number|undefined;   // 要复制的文本
    shorten?: boolean;       // 是否省略显示
    front?: number;          // 保留前几位
    back?: number;           // 保留后几位
};

export const CopyableText: React.FC<CopyableTextProps> = ({ text }) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const [copied, setCopied] = useState(false);
    const str = String(text);

    const handleCopy = () => {
        copyToClipboard(str);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2 秒后恢复
    };

    return (
        <Popover size={'sm'} color={'success'} placement="top">
            <PopoverTrigger>
                        <span
                            onClick={handleCopy}
                            title={copied ? "已复制 ✅" : "点击复制"}
                            className="cursor-pointer"
                        >
                {copied ? <CopyCheck color={'hsl(145.96 79.46% 43.92% / 1)'} size={14} /> : <Copy size={14} />}

    </span>

            </PopoverTrigger>
            <PopoverContent>
                已复制
            </PopoverContent>
        </Popover>

    );
};

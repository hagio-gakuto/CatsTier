package com.example.demo.constant;

public class Const {

    // 共通
    public static final int DELETE_FLG_FALSE = 0;
    public static final int DELETE_FLG_TRUE = 1;

    // ユーザー
    // public static final String DEFAULT_USER_NAME = "ユーザー様";

    // 写真
    public static final int PICTURE_CATEGORY_USER = 1;

    // エラー
    public static final String NOT_UID_MSG = "UIDがありません。";

    // コンストラクタはプライベートにして、インスタンス化を防ぐ
    private Const() {
	throw new UnsupportedOperationException("定数クラスはインスタンス化できません");
    }
}